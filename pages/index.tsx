import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent } from '@/components/ui/drawer'
import FormContainer from '@/container/FormContainer'
import { useState } from 'react'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home() {
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [valueEdit, setShowValueEdit] = useState<{
    id: number
    title: string
    url: string
  }>({
    id: 0,
    title: '',
    url: '',
  })
  const { data: dataLinks, isLoading } = useSWR('/api/links', fetcher)

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Form Create Link</CardTitle>
            <CardDescription>submit your link here</CardDescription>
          </CardHeader>
          <CardContent>
            <FormContainer />
          </CardContent>
        </Card>
        {isLoading && <p>Loading ...</p>}
        {dataLinks?.data?.map(
          (link: { id: number; url: string; title: string }) => (
            <Card key={link.id}>
              <CardContent className="flex justify-between">
                <a href={link.url} target="_blank">
                  {link.title}
                </a>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setShowValueEdit({
                      id: link.id,
                      title: link.title,
                      url: link.url,
                    })
                    setShowEdit(true)
                  }}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          ),
        )}
      </div>
      <Drawer open={showEdit} onOpenChange={setShowEdit}>
        <DrawerContent>
          <div className="container mx-auto p-4">
            <FormContainer
              id={valueEdit.id}
              values={{
                title: valueEdit.title,
                url: valueEdit.url,
              }}
              onFinished={(val) => setShowEdit(val)}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}
