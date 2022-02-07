import { NextApiRequest, NextApiResponse } from 'next'
import { sampleUserData } from '../../../utils/sample-data'
import { sanityClient, urlFor } from "../sanity"

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(sampleUserData)) {
      throw new Error('Cannot find user data')
    }

    res.status(200).json(sampleUserData)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
  _id,
  title,
  author-> {
  name,
  image
  },
  description,
  mainImage,
  slug
  };`

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts
    }
  }
}