/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home() {
  const { data: dataLinks, isLoading, mutate } = useSWR(`/api/links/`, fetcher)

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="container">
          <h1 className="text-xl font-bold">{`Hello everyone 👋`}</h1>
          <p>This is a an area to create your links, so lets put here !!</p>
        </div>
        {isLoading && <p>Loading ...</p>}
        {dataLinks?.data?.map(
          (link: { id: number; url: string; title: string }) => (
            <Card key={link.id}>
              <CardContent className="flex justify-between">
                <a href={link.url} target="_blank">
                  {link.title}
                </a>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    </>
  )
}
