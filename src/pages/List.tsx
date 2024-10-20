import { Switch } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import telegramIcon from '../assets/icons/telegram.svg';
import batIcon from '../assets/icons/bat.svg'; // Import your bat icon here

interface NodeBody {
  id: string;
  group: number;
  avatar: string;
  username: string;
  description?: string;
  tags?: Tag[];
  createdAt: Date;
}

interface Tag {
  title: string;
  color: string;
}

const List = ({ data, isListView, setIsListView }: { data: NodeBody[], isListView: boolean, setIsListView: (val: boolean) => void }) => {
  const [filter, setFilter] = useState('lastAdded');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isHalloweenTheme, setIsHalloweenTheme] = useState(false); // State for Halloween theme

  const filteredData = data
    .filter(node => {
      if (selectedTag) {
        return node.tags?.some(tag => tag.title === selectedTag);
      }
      return true;
    })
    .filter(node => {
      if (searchTerm) {
        return node.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
               node.description?.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => {
      if (filter === 'lastAdded') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return 0;
    });

  const uniqueTags = Array.from(new Set(data.flatMap(node => node.tags?.map(tag => tag.title) || [])));

  return (
    <div className="p-4" style={{ backgroundColor: isHalloweenTheme && 'black', color: isHalloweenTheme ? 'red' : 'white' }}>
      <div className="fixed top-8 right-4 z-10 rounded-xl p-2 flex items-center backdrop-blur -mt-4">
        <Switch checked={isListView || isHalloweenTheme} onClick={() => setIsListView(!isListView)}>List</Switch>
        <div className={`${isListView ? 'opacity-100' : 'opacity-60'} ml-4`}>List view</div>
        <button 
          className={`ml-4 px-4 py-2 rounded-md ${isHalloweenTheme ? 'bg-orange-500 text-white' : 'bg-blue-500 text-black'}`}
          onClick={() => setIsHalloweenTheme(!isHalloweenTheme)}
        >
          <img src={batIcon} className='h-6 w-6' alt="Toggle Halloween Theme" />
        </button>
      </div>

      <div className="text-2xl">List</div>
      <div className="text-xs opacity-60">See your network contacts in list format</div>
      <div className="mt-4 mb-6 space-y-4">
        <div className="flex space-x-4">
          <button 
            className={`px-4 py-2 ${isHalloweenTheme && filter === 'lastAdded' ? 'bg-orange-500 text-white' : 'bg-gray-500 text-white'} rounded-md`}
            onClick={() => {
              setFilter('lastAdded');
              setSelectedTag(null);
            }}
          >
            Last Added
          </button>
          <select 
            style={{
              width: 240,
              background: isHalloweenTheme ? 'black' : 'var(--tgui--secondary_bg_color)',
              color: isHalloweenTheme && 'white'
            }}
            header="Select"
            className="px-4 py-2 rounded-md"
            value={selectedTag || ''}
            onChange={(e) => {
              setFilter('byTag');
              setSelectedTag(e.target.value || null);
            }}
          >
            <option value="">Filter by Tag</option>
            {uniqueTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <input
            style={{
              width: 400,
              maxWidth: '100%',
              background: isHalloweenTheme ? 'black' : 'var(--tgui--secondary_bg_color)',
              color: isHalloweenTheme ? 'white' : 'black'
            }} 
            header="Input"
            type="text" 
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <div className="space-y-2 mt-4 pb-16">
        {filteredData.map(node => (
          <div className={`flex items-center p-2 border-2 rounded-xl ${isHalloweenTheme ? 'border-red-500 bg-gray-800' : 'border-gray-300'}`} key={node.id}>
            <img src={node.avatar} className="h-12 w-12 rounded-full" alt="" />
            <div className='h-full ml-2'>
              <div>{node.username}</div>
              {node.tags && node.tags.map(tag => (
                <span 
                  className={`px-1 -py-2 text-xs ${isHalloweenTheme ? 'text-black bg-white' : 'text-black bg-[#ffff00]'} rounded-xl`} 
                  key={tag.title}
                >
                  {tag.title}
                </span>
              ))}
            </div>
            <div className="ml-2">
            </div>
            <img src={telegramIcon} onClick={() => window.open(`https://t.me/${node.id}`)} className="w-8 h-8 ml-auto" alt=""/>
          </div>
        ))}
      </div>
    </div>
  )
};

export default List;
