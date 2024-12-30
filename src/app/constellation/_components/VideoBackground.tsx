'use client';

const VideoBackground= () => {
  return (
    <div className="absolute inset-0 h-[640px] w-full -z-10 -mt-[120px]">
      {/* 비디오 */}
      <video
        className="w-full h-full object-cover"
        src="https://v1.pinimg.com/videos/mc/720p/19/97/26/1997262b68e29d5b4c3f5a1029bf7f4d.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 오버레이 */}
      <div className="indent-[-9999px] absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.4)]">
        <span className="sr-only">overlay</span>
      </div>
    </div>
  );
}

export default VideoBackground;