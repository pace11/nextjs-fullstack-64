// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/db'
import { linksTable } from '@/lib/db/schema'
import { isNull, desc, and, eq } from 'drizzle-orm'
import { withAuth } from '@/lib/middleware'
import { JWT } from 'next-auth/jwt'

type Response = {
  id: number
  title: string
  url: string
  created_at: Date | null
  updated_at: Date | null
  deleted_at: Date | null
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Response[] }>,
  session?: JWT | null,
) {
  const data = await db
    .select()
    .from(linksTable)
    .where(
      and(
        eq(linksTable.email, String(session?.email)),
        isNull(linksTable.deleted_at),
      ),
    )
    .orderBy(desc(linksTable.updated_at))

  res.status(200).json({ data })
}

export default withAuth(handler)
