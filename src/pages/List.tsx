import { Switch} from "@telegram-apps/telegram-ui";
import telegramIcon from '../assets/icons/telegram.svg'

interface NodeBody {
  id: string;
  group: number;
  avatar: string;
  username: string;
  description?: string;
  tags?: Tag[];
}

interface Tag {
  title: string;
  color: string;
}

const List = ({data, isListView, setIsListView} : {data: NodeBody[], isListView: boolean, setIsListView: (val: boolean) => void}) => {
  return (
    <div className="p-4">
      <div className="fixed top-8 right-4 z-10 rounded-xl p-2 flex items-center backdrop-blur -mt-4">
        <Switch checked={isListView} onClick={() => setIsListView(!isListView)}>List</Switch>
        <div className={`${isListView ? 'opacity-100' : 'opacity-60'} ml-4`}>List view</div>
      </div>
      <div className="text-2xl">List</div>
      <div className="text-xs opacity-60">See your network contacts in list format</div>
      <div className="space-y-2 mt-4 pb-16">
        {data.map(node => (
          <div className="flex items-center p-2 border-white border-opacity-5 border-2 rounded-xl" key={node.id}>
            <img src={node.avatar} className="h-12 w-12 rounded-full" alt=""/>
            <div className='h-full ml-2'>
              <div>{node.username}</div>
                {node.tags && node.tags.map(tag => <span className={`px-1 -py-2 text-xs text-black bg-[#ffff00] rounded-xl`} key={tag.title}>{tag.title}</span>)}
            </div>
            <div className="ml-2">
            </div>
            <img src={telegramIcon} className="w-8 h-8 ml-auto" alt=""/>
          </div>
        ))}
      </div>

    </div>
  )
};

export default List;