"use client";
import React, { useState, useEffect } from 'react';
import { Menu, Button, Avatar, Dropdown, Select } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { setSessions } from '@/app/GlobalRedux/Features/sessions/sessionsSlice';
import { getUserSessions } from '@/utils/functions';

const { Option } = Select;

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [filter, setFilter] = useState('all');
  const { user } = useSelector((state: RootState) => state.auth);
  const sessions = useSelector((state: RootState) => state.sessions);
  const dispatch = useDispatch();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
      if (user?.userId) {
        try {
          const userSessions = await getUserSessions(user.userId);
          dispatch(setSessions(userSessions));
        } catch (error) {
          console.error('Error fetching sessions:', error);
        }
      }
    };

    fetchSessions();
  }, [user, dispatch]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleSessionClick = (sessionId: string,sessionType:string) => {
    router.push(`/${sessionType}?sessionId=${sessionId}`);
  };

  const userMenu: any = (
    <Menu>
      <Menu.Item key="1" onClick={()=>alert("Profile Clicked")}>Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  );

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    return session.sessionType === filter;
  });

  const truncateTitle = (title: string, limit: number) => {
    return title.length > limit ? title.substring(0, limit) + '...' : title;
  };

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex h-screen">
      <aside className={`bg-gray-800 text-white transition-all duration-300 ${collapsed ? 'w-0' : 'w-64'}`}>
        <div className="p-4">
          {!collapsed && (
            <Select
              defaultValue="all"
              style={{ width: '100%' }}
              onChange={(value)=>setFilter(value)}
              options={[
                { value: 'all', label: 'All' },
                { value: 'learn', label: 'Learning' },
                { value: 'revise', label: 'Revising' }
              ]}
            />
          )}
        </div>
        <nav className="overflow-y-auto h-[calc(100vh-4rem)]">
          <ul>
            {filteredSessions.map((session) => (
              <li
                key={session.id}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer border border-gray-700 rounded-md m-2"
                onClick={() => handleSessionClick(session.sessionId,session.sessionType)}
              >
                <span className="text-sm">{truncateTitle(session.title, 25)}</span>
                <br />
                <span className="text-xs text-gray-400">{session.sessionType}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="flex flex-col flex-grow">
        <header className="bg-white shadow">
          <div className="flex justify-between items-center px-4 py-2">
            <div className="flex items-center">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleSidebar}
                className="text-lg w-10 h-10"
              />
              <h1 className="text-xl font-bold ml-4">Learnability AI</h1>
            </div>
            <div className="flex items-center">
              {/* Place for logo */}
              <div className="w-8 h-8 bg-gray-800 mr-4"></div>
              <Dropdown menu={{ items: userMenu }} trigger={['click']}>
                <a className="flex items-center" onClick={e => e.preventDefault()}>
                  <Avatar icon={<UserOutlined />} className="mr-2" />
                  {mounted && user?.displayName && <span>{user.displayName}</span>}
                </a>
              </Dropdown>
            </div>
          </div>
        </header>
        <main className="flex-grow overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;