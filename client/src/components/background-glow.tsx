
const BackgroundGlow = () => {
       return (
              <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                     {/* Top Right Cyan-ish Glow */}
                     <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse" />

                     {/* Bottom Left Blue-ish Glow */}
                     <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />

                     {/* Center subtle purple glow */}
                     <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-[80px]" />
              </div>
       );
};

export default BackgroundGlow;
