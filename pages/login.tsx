import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
import { GetServerSidePropsContext, GetServerSideProps } from 'next'
// import { useEffect } from 'react'
// import { useRouter } from 'next/router'

export default function Login() {
  // const router = useRouter()
  // const session = useSession()

  // salah satu opsi, tapi bukan yang utama
  // useEffect(() => {
  //   if (session) {
  //     router.push('/')
  //   }
  // }, [])

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>LOGIN</CardTitle>
          <CardDescription>Please Login First</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Button onClick={() => signIn('google')}>Signin Google</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext,
// ) => {
//   const token = await getToken({
//     req: context.req,
//     secret: process.env.NEXTAUTH_SECRET,
//   })

//   if (token) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }

//   return { props: {} }
// }
