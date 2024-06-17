import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Process a POST request
    res.json({
      status: 200,
      data: "betttooooollll"
    })
  } else {
    // Handle any other HTTP method
  }
}