import { authConfig } from '@/lib/auth';
import { getServerSession } from 'next-auth';
const { createContext, useState } = require('react');

const userContext = createContext({ user: null, setUser: () => {} });

const UserProvider = ({ children, defaultValue }) => {
  const [user, setUser] = useState(defaultValue);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

// export default UserProvider;

export { UserProvider, userContext };
