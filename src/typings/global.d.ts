declare module '*.scss';
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';
interface Window extends Window {
  dataLayer: any[];
  sendrc: (eventName: string, eventValues?: any) => void
}
declare module '*.svg' {
  const content: any
  export default content
}