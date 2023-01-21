import { FaUsers, FaCommentAlt, FaTable } from 'react-icons/fa'
import { BiImageAdd } from 'react-icons/bi'
import { TbSum } from 'react-icons/tb'
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
    icon: <FaTable />,
    path: '/dash',
  },
  {
    title: 'Summary',
    icon: <TbSum />,
    path: '/summary',
  },
  {
    title: 'Add Product',
    icon: <BiImageAdd />,
    path: '/add-product',
  },
  {
    title: 'Account',
    icon: <FaUsers />,
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
    title: 'Contact Us',
    icon: <FaCommentAlt />,
    path: '/contact-us',
  },
]

export default menu
