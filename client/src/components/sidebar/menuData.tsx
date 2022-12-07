import { FaTh, FaRegChartBar, FaCommentAlt } from 'react-icons/fa'
import { BiImageAdd } from 'react-icons/bi'
import { IconBaseProps } from 'react-icons/lib'

export type Item = {
  title: string
  icon: IconBaseProps
  path: string
}
export type ItemArr = {
  title: string
  icon: any
  children: [
    {
      title: string
      path: string
    },
    {
      title: string
      path: string
    }
  ]
}
const menu: (Item | ItemArr)[] = [
  {
    title: 'Dashboard',
    icon: <FaTh />,
    path: '/dashboard',
  },
  {
    title: 'Add Product',
    icon: <BiImageAdd />,
    path: '/add-product',
  },
  {
    title: 'Account',
    icon: <FaRegChartBar />,
    children: [
      {
        title: 'Profile',
        path: '/profile',
      },
      {
        title: 'Edit Profile',
        path: '/profile-update',
      },
    ],
  },
  {
    title: 'Report Bug',
    icon: <FaCommentAlt />,
    path: '/contact-us',
  },
]

export default menu
