import "./Icon.css";

export type IconName = 'trash' | 'copy' | 'warning' | 'magnifying_glass' | 'no_result';

interface IconProps {
    name: IconName;
}

const icons: Record<IconName, string> = {
    copy: `<svg data-name="copy" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z" fill="currentColor"/> <path d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z" fill="currentColor"/></svg> `,
    trash: `<svg data-name="trash" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path></svg>`,
    warning: `<svg data-name="warning" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 512 512"><title>ionicons-v5-r</title><path d="M85.57,446.25H426.43a32,32,0,0,0,28.17-47.17L284.18,82.58c-12.09-22.44-44.27-22.44-56.36,0L57.4,399.08A32,32,0,0,0,85.57,446.25Z" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M250.26,195.39l5.74,122,5.73-121.95a5.74,5.74,0,0,0-5.79-6h0A5.74,5.74,0,0,0,250.26,195.39Z" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M256,397.25a20,20,0,1,1,20-20A20,20,0,0,1,256,397.25Z"/></svg>`,
    magnifying_glass: `<svg data-name="magnifying_glass" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 1024 1024" class="icon" version="1.1"><path d="M448 768A320 320 0 1 0 448 128a320 320 0 0 0 0 640z m297.344-76.992l214.592 214.592-54.336 54.336-214.592-214.592a384 384 0 1 1 54.336-54.336z" fill="#000000"/></svg>`,
    no_result: `<svg data-name="no_result" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 424 511.51"><path fill-rule="nonzero" d="M174.43 443.27H21.31C9.54 443.27 0 433.73 0 421.97V21.3C0 9.51 9.52 0 21.31 0h200.94c3.64 0 6.97 1.66 9.15 4.36l104.84 102.09c5.64 5.64 8.62 10.07 8.62 11.43l-.02 135.35c-7.59-3.2-15.53-5.72-23.76-7.49l-.01-113.62h-98.82c-6.64 0-11.94-5.41-11.94-11.95V23.69H23.8v395.78h140.26c2.7 8.32 6.18 16.28 10.37 23.8zm118.07-169.1c28.59 0 54.48 11.59 73.22 30.33 18.75 18.74 30.33 44.63 30.33 73.23 0 20.92-6.2 40.39-16.87 56.68L424 483.26l-30.9 28.25-43.23-47.56c-16.42 10.95-36.15 17.34-57.37 17.34-28.6 0-54.49-11.6-73.22-30.34-18.75-18.74-30.34-44.63-30.34-73.22 0-28.6 11.59-54.49 30.33-73.23 18.74-18.74 44.63-30.33 73.23-30.33zm59.62 43.93c-15.25-15.26-36.33-24.7-59.62-24.7s-44.37 9.44-59.62 24.7c-15.26 15.26-24.7 36.34-24.7 59.63 0 23.28 9.44 44.37 24.7 59.62 15.25 15.26 36.33 24.69 59.62 24.69s44.37-9.43 59.62-24.69c15.26-15.26 24.7-36.34 24.7-59.62 0-23.29-9.44-44.37-24.7-59.63zm-36.35 21.39 14.49 14.57-23.37 23.67 23.39 23.69-14.53 14.49-23.25-23.54-23.27 23.58-14.49-14.57 23.36-23.67-23.38-23.69 14.53-14.49 23.24 23.54 23.28-23.58z"/></svg>`,
};

export const Icon = ({ name }: IconProps) => {
    const svg = icons[name];
    return <div className="icon" dangerouslySetInnerHTML={{ __html: svg }}></div>;
};
