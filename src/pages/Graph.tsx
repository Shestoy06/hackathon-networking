import React, {useEffect, useState, useCallback, useRef} from 'react';
import ForceGraph2D, {ForceGraphMethods, NodeObject} from 'react-force-graph-2d';
import data from './miserables.json';
import filterIcon from '@/assets/icons/bars-filter-icon.svg';
import batIcon from '@/assets/icons/bat.svg'; // Add your bat icon path here
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { Button, Modal, Switch } from "@telegram-apps/telegram-ui";
import {
  ModalHeader
} from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import {Button, Input, Modal, Select, Switch} from "@telegram-apps/telegram-ui";
import List from "@/pages/List.tsx";
import { initQRScanner } from "@telegram-apps/sdk-react";
import toast from "react-hot-toast";
import {User} from "@/utils/interfaces/user.interface.ts";
import {useOutletContext} from "react-router-dom";
import UserService from "@/api/services/user.service.ts";
import {useQueryClient} from "@tanstack/react-query";
import {QueryKeys} from "@/utils/enums/queryKeys.ts";
//import mockData from './miserables.json'

const Graph2D = () => {
  const [isListView, setIsListView] = useState(false);
  const [imageCache, setImageCache] = useState({});
  const [selectedNode, setSelectedNode] = useState<NodeObject | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null); // Added state for selected theme
  const [isHalloweenTheme, setIsHalloweenTheme] = useState(false); // State for Halloween theme
  const forceGraphRef = useRef<ForceGraphMethods | null>(null);

  const qrScanner = initQRScanner();

  const user = useOutletContext<User>()

  useEffect(() => {
    const loadImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
      });
    };

    const preloadImages = async () => {
      const cache = {};
      for (const node of data.nodes) {
        // @ts-ignore
        const avatarUrl = node.avatar || 'https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp';
        cache[node.id] = await loadImage(avatarUrl);
      }
      setImageCache(cache);
    };

    preloadImages();
  }, [user]);
  // @ts-ignore
  const drawNode = useCallback((node, ctx, globalScale) => {
    const imgSize = node.size || 10;
    const fontSize = Math.min(3, 12 * globalScale / 4);
    const textOpacity = Math.min(globalScale / 4, 0.9);

    const img = imageCache[node.id];

    if (img) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(node.x, node.y, imgSize / 2, 0, 2 * Math.PI, false);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, node.x - imgSize / 2, node.y - imgSize / 2, imgSize, imgSize);
      ctx.restore();
    }

    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = isHalloweenTheme ? 'white' : `rgba(201, 225, 253, ${textOpacity})`; // Change text color based on theme
    ctx.fillText(node.username || node.id, node.x, node.y + imgSize / 2 + 1);
  }, [imageCache, isHalloweenTheme]);

  const handleNodeDragEnd = (node: NodeObject) => {
    node.fx = node.x; // Set the fixed x position
    node.fy = node.y; // Set the fixed y position
  };

  useEffect(() => {
    // @ts-ignore
    if (forceGraphRef && forceGraphRef.current) {
      // @ts-ignore
      const chargeForce = forceGraphRef.current.d3Force('charge');
      if (chargeForce) {
        chargeForce.strength(-50).distanceMax(100);
      }
    }
  }, [forceGraphRef]);

  if (isListView) {
    // @ts-ignore
    return <List data={user.contacts} isListView={isListView} setIsListView={setIsListView}/>
  }

  const getTelegramChatNameFromLink = (url: string): string => {
    const regexp = /[^/]+$/;
    return url.match(regexp)![0];
  };
  const data = {
    nodes: [...user.themes, ...user.contacts],
    links: user.links
  }

  const queryClient = useQueryClient()

  return (
    <div style={{ backgroundColor: isHalloweenTheme ? 'black' : '#1d2134', minHeight: '100vh', color: isHalloweenTheme && 'white' }}>
      <div className="fixed top-0 left-0 z-10 p-4">
        <Modal
          className="z-50 border-white border-2 border-opacity-5"
          overlayComponent={<div className=""></div>}
          header={<ModalHeader></ModalHeader>}
          trigger={
            <div className="backdrop-blur p-2 rounded-lg">
              <img src={filterIcon} className='h-6 w-6' alt="" />
            </div>}
        >
          <div className={'text-center text-2xl font-semibold mb-4'}>Filters</div>
          <div className="flex flex-col items-center">
            <Button onClick={() => setSelectedTheme('Hackathon')}>Hackathon</Button>
            <Button onClick={() => setSelectedTheme('Hackathon 2')}>Hackathon 2</Button>
            <Button onClick={() => setSelectedTheme(null)}>Reset</Button>
          </div>
        </Modal>
      </div>

      <div className="fixed bottom-20 right-4 z-10">
        <Modal
          className="z-50 border-white border-2 border-opacity-5"
          overlayComponent={<div className=""></div>}
          header={<ModalHeader></ModalHeader>}
          trigger={<Button className='px-6'>Add</Button>}
        >
          <div className={'p-4 pb-8'}>
            <div className={'text-center text-2xl font-semibold mb-4'}>Add something new</div>
            <Button stretched={true} onClick={() => {
              qrScanner.open({
                text: 'Scan QR code',
                capture({ data }) {
                  // Capture QRs contanining Telegram user link.
                  // @ts-ignore
                  return data.startsWith('https://t.me');
                }
              }).then((qr) => {
                // May be something like 'https://t.me/heyqbnk' or null.
                if (qr) {
                  UserService.addContact(user.telegramId, getTelegramChatNameFromLink(qr)).then(() => queryClient.invalidateQueries({queryKey: [QueryKeys.USER]}))
                }
              });
            }}>Add new contact</Button>
            <NewThemeModal/>
          </div>
        </Modal>
      </div>

      <div className="fixed top-4 right-4 z-10 rounded-xl p-2 flex items-center backdrop-blur">
        <Switch checked={isListView} onClick={() => setIsListView(!isListView)}>List</Switch>
        <div className={`${isListView ? 'opacity-100' : 'opacity-60'} ml-4`}>List view</div>
        <Button 
          className="ml-4" 
          onClick={() => setIsHalloweenTheme(!isHalloweenTheme)} 
          style={{ backgroundColor: isHalloweenTheme ? 'orange' : 'inherit' }} // Change button color
        >
          <img src={isHalloweenTheme ? batIcon : batIcon} className='h-6 w-6' alt="Toggle Halloween Theme" /> {/* Change icon */}
        </Button>
      </div>

      <ForceGraph2D
        ref={forceGraphRef}
        graphData={data}
        nodeAutoColorBy="group"
        backgroundColor={isHalloweenTheme ? 'black' : '#1d2134'} // Change background color
        nodeCanvasObject={drawNode}
        dagLevelDistance={-100}
        nodePointerAreaPaint={(node, color, ctx) => {
          const imgSize = 10;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, imgSize / 2, 0, 2 * Math.PI, false);
          ctx.fill();
        }}
        onNodeClick={(node) => {
          setModalIsOpen(!modalIsOpen);
          setSelectedNode(node);
        }}
        warmupTicks={50}
        linkCanvasObject={(link, ctx) => {
          const isSelected = selectedTheme && (link.source.id === selectedTheme || link.target.id === selectedTheme);
          ctx.strokeStyle = isHalloweenTheme ? 'red' : (isSelected ? '#0098EA' : '#D3D3D3'); // Change link color
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(link.source.x, link.source.y);
          ctx.lineTo(link.target.x, link.target.y);
          ctx.stroke();
        }}
        onNodeDragEnd={handleNodeDragEnd}
      />
      <UserModal node={selectedNode!} open={modalIsOpen} setIsOpen={() => setModalIsOpen} />
    </div>
  );
};

const UserModal = ({node, open, setIsOpen}: { node: NodeObject, open: boolean, setIsOpen: (val: boolean) => void}) => {
  if (!node) return null
  const user = useOutletContext<User>()
  const queryClient = useQueryClient()
  return (
    <Modal
      overlayComponent={<div className=""></div>}
      className="z-50 border-white border-2 border-opacity-5"
      header={<ModalHeader></ModalHeader>}
      open={open}
      onOpenChange={() => {
        if (!open) setIsOpen(false);
      }}
    >
      <div className="flex flex-col items-center p-4 space-y-4 pb-8">
        <img className="rounded-full w-32 h-32" src={node.avatar || 'https://pics.craiyon.com/2023-11-26/oMNPpACzTtO5OVERUZwh3Q.webp'} alt=""/>
        <div className="text-xl font-bold">{node && node.id}</div>
        <div className="opacity-60">{node.description && node.description}</div>
        <Select header="Theme" onChange={(value) => {
          // @ts-ignore
          UserService.addLink(user.telegramId, node.id, value.target.value).then(() => queryClient.invalidateQueries({queryKey: [QueryKeys.USER]}))
        }}>
          <option>Choose theme</option>
          {user.themes.map(theme => {

            return (<option key={theme.id}>{theme.id}</option>)
          })}
        </Select>
        <Button stretched={true} onClick={() => window.open(`https://t.me/${node.username}`)}>Write a message</Button>
      </div>
    </Modal>
  );
}

const NewThemeModal = () => {
  const [value, setValue] = useState<string>('')
  const user = useOutletContext<User>()
  const queryClient = useQueryClient()
  return (
    <Modal
      className="z-50"
      header={<ModalHeader></ModalHeader>}
      trigger={<Button mode={'bezeled'} stretched={true} className={'mt-4'}>Add new theme</Button>
      }
    >
      <div className={'p-4 pb-8'}>
        <div className={'text-center text-2xl font-semibold'}>Create new theme</div>
        <Input header="Input" onChange={(e) => setValue(e.target.value)}  placeholder="I am usual input, just leave me alone" />
        <Button stretched={true} disabled={value.length < 1} className='mt-4' onClick={() => {
          UserService.addTheme(
            user.telegramId,
            {id: value.trim(),
              avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_s4hzT31Pte691BvjmzSisxWjjRGLuGPG_g&s', description: ''}).
          then(() => queryClient.invalidateQueries({queryKey: [QueryKeys.USER]}))}}>
          Create</Button>
      </div>
    </Modal>
  )
}

export default Graph2D;
