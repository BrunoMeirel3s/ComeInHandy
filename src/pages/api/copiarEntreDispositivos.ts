import { getSession, useSession } from "next-auth/react";

import { fauna } from "@/services/fauna";
import { query as q } from "faunadb";
import { Ref } from "react";

const requestCounts = new Map();
const MAX_REQUESTS_PER_MINUTE = 40; // Qtd de requests por minuto
const RATE_LIMIT_INTERVAL = 60000; // 1 minuto

interface User {
  ref: Ref<{ data: { email: string } }>;
  ts: number;
}

interface Text {
  ts: number;
  data: {
    text: string;
  };
}

function rateLimitAndOriginMiddleware(req, res, next) {
  const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const allowedOrigin = "https://comeinhandy.com.br";

  // if (req.headers.origin !== allowedOrigin) {
  //   return res.status(403).json({ error: 'Forbidden' });
  // }

  if (requestCounts.has(clientIP)) {
    const count = requestCounts.get(clientIP);
    if (count >= MAX_REQUESTS_PER_MINUTE) {
      return res.status(429).json({ error: "Too Many Requests" });
    }
    requestCounts.set(clientIP, count + 1);
  } else {
    requestCounts.set(clientIP, 1);
  }

  // Reseta o contator de requests após o intervalo especificado
  setTimeout(() => {
    requestCounts.delete(clientIP);
  }, RATE_LIMIT_INTERVAL);

  next();
}

export default async function handler(req, res) {
  const { method, query, body } = req;
  // const session = await getSession({ req });
  const session = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .json({ error: true, message: "Unauthorized", data: {} });
  }

  try {
    const { ref } = (await fauna
      .query(
        q.Get(
          q.Match(
            q.Index("user_by_email"),
            q.Casefold(`${session.user?.email}`)
          )
        )
      )
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return null;
      })) as User;

    const user = ref;

    if (!user) {
      return res
        .status(404)
        .json({ error: true, message: "User not found", data: {} });
    }

    /**
     * Parte responsável por retornar o texto salvo do usuário
     */
    if (method === "GET" && query.action === "get") {
      const text = (await fauna
        .query(
          q.Get(
            q.Match(
              q.Index("text_by_user_feature_copiar_entre_dispositivos"),
              q.Casefold(user)
            )
          )
        )
        .then((response) => {
          return response;
        })
        .catch((err) => {
          return null;
        })) as Text;

      if (!text) {
        return res.status(404).json({
          error: true,
          message: "No text found for this user",
          data: {},
        });
      } else {
        return res.status(200).json({
          error: false,
          message: "text returned with success",
          data: { text: text.data.text },
        });
      }
      /**
       * Parte responsável por salvar o texto do usuário,
       * criado inicialmente desta forma devido a limitação da sessão utilizada
       * pelo nextauth, não foi possível utilizar a sessão em métodos diferentes
       * de GET
       */
    } else if (method === "GET" && query.action === "update") {
      const text = query.text ?? "";
      const userRef = user; // Assuming user is already a Ref object

      const existingText = await fauna.query(
        q.If(
          q.Not(
            q.Exists(
              q.Match(
                q.Index("text_by_user_feature_copiar_entre_dispositivos"),
                userRef
              )
            )
          ),
          // Create the document if it doesn't exist
          q.Create(q.Collection("feature_copiar_entre_dispositivos"), {
            data: { user: userRef, text: text },
          }),
          // Update the existing document
          q.Update(
            q.Select(
              ["ref"],
              q.Get(
                q.Match(
                  q.Index("text_ref_by_user_feature_copiar_entre_dispositivos"),
                  userRef
                )
              )
            ),
            { data: { text: text } }
          )
        )
      );

      if (existingText) {
        return res.status(200).json({
          error: false,
          message: "Text updated successfully",
          data: {},
        });
      } else {
        return res.status(400).json({
          error: true,
          message: "Failed to update text",
          data: {},
        });
      }
    } else {
      return res
        .status(401)
        .json({ error: true, message: "Method not allowed", data: {} });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: true,
      message: "Erro ao processar solicitação",
      data: {},
    });
  }
}
