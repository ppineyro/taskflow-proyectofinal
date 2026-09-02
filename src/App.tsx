import { useEffect, useState } from 'react'

interface ServerInfo {
  version: string;
  app: string;
}

function App() {
  const [serverInfo, setServerInfo] = useState<ServerInfo | null>(null);

  useEffect(() => {
    async function fetchServerInfo() {
      const response = await fetch("https://d3ujwk09smrk9z.cloudfront.net/info");
      const data = await response.json();

      setServerInfo(data);
    }

    fetchServerInfo();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Server Info</h1>

      {serverInfo && (
        <div>
          <p>App: {serverInfo.app}</p>
          <p>Version: {serverInfo.version}</p>
        </div>
      )}
    </div>
  );
}

export default App