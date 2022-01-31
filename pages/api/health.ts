import { NextApiRequest, NextApiResponse } from "next"

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      ready: true,
      build: process?.env?.BUILD_ID,
    })
  } catch (e) {
    console.log(e)
    res.status(502).json({
      success: false,
      ready: false,
      build: process?.env?.BUILD_ID,
    })
  }
}

export default handler
