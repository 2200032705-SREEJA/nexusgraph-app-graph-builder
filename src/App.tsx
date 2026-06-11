import { TopBar } from './components/layout/TopBar';
import { LeftRail } from './components/layout/LeftRail';
import { RightPanel } from './components/layout/RightPanel';
import { Canvas } from './components/canvas/Canvas';

export default function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[hsl(222_25%_7%)]">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftRail />
        <Canvas />
        <RightPanel />
      </div>
    </div>
  );
}
