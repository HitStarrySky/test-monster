export type IEventType = 'CLICK' | 'INPUT' | 'FOCUS' | 'SCORLL';

export type FormType = 'INPUT' | 'TEXTAREA';
// 操作记录
export interface IOperateRecord {
  id: string;
  eventType: IEventType;
  xPath: string;
  formValue: any;
}

export type IOperateSet = Map<string, IOperateRecord>;

export interface NativeUI {
  status: number;
  example: undefined | HTMLElement;
  show: () => void;
  hidden: () => void;
  destroy: () => void;
}
export class NativeBase implements NativeUI {
  display = 'block';
  status = 0;
  example: HTMLElement | undefined = undefined;
  constructor(className: string, display: string, tagClassName: string = 'div', target?: Element) {
    const base = document.createElement(tagClassName);
    base.className = className;
    base.dataset.testMonster = 'true'; // 给注入的元素打上标记
    this.display = display;
    this.example = base;
    const App = document.querySelector('#app');
    target ? target.appendChild(this.example) : App ? App.appendChild(this.example) : document.body.appendChild(this.example);
  }
  show() {
    if (this.example) {
      this.example.style.display = this.display;
      this.status = 1;
    }
  }
  hidden() {
    if (this.example) {
      this.example.style.display = 'none';
      this.status = 0;
    }
  }
  destroy() {
    const App = document.querySelector('#app');
    if (this.example) App ? App.removeChild(this.example) : document.body.removeChild(this.example);
    this.example = undefined;
    this.status = 0;
  }
}
