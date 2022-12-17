import type { NextApiRequest, NextApiResponse } from 'next'

type MenuOps = {
  op1: string,
  op2: string
}

export default (req: NextApiRequest, res: NextApiResponse<MenuOps>) => {
  res.status(200).json({ op1: 'Free Battle', op2: 'Demo Chapter' })
}