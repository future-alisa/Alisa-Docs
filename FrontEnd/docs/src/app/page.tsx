import MyEditor from '../components/editor/editor'
import MyNavigator from '@/components/navigator'

export default function Home() {
  const users=
  [
    {
      key:1,
      name:'孙'
    },
    {
      key:2,
      name:'韦'
    },
    {
      key:3,
      name:'常'
    }
  ]
  return (
    <>
      <MyNavigator users={users}></MyNavigator>
      <MyEditor></MyEditor>
      </>
  )
}
