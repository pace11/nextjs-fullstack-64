import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt'

export const withAuth =
  (
    handler: (
      req: NextApiRequest,
      res: NextApiResponse,
      session?: JWT | null,
    ) => Promise<void>,
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    return handler(req, res, session)
  }
