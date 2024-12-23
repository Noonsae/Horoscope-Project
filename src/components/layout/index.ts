// import할 때 가독성을 높이는 index.ts

export { default as Header } from './Header';
export { default as Footer } from './Footer';
export { default as Navigation } from './Navigation';

// 기존 방식
// import Footer from '@/components/layout/Footer';
// import Header from '@/components/layout/Header';
// import Navigation from '@/components/layout/Navigation';

// index 파일 사용 시
// import { Footer, Header, Navigation } from '@/components/layout';
