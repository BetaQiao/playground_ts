// 接口
interface subject {
    addListener(o: observer): void;
    removeListener(o: observer): void;
    notify(): void;
}

interface observer {
    update(index: number): void;
}

// 实现Class
class concreteSubject implements subject {
    private _observers: observer[];

    constructor() {
        this._observers = [];
    }

    addListener(o: observer) {
        this._observers.push(o);
    };

    removeListener(o: observer) {
        const index = this._observers.indexOf(o);
        if (index > 0) {
            this._observers.splice(index, 1);
        }
    };

    notify() {
        for (let index = 0; index < this._observers.length; index++) {
            const o = this._observers[index];
            o.update(index);
        }
    }
}

class concreteObserver implements observer {
    private _subject: subject;
    _name: string;

    constructor(s: subject, n: string) {
        this._subject = s;
        this._subject.addListener(this);

        this._name = n;
    }

    update(index: number) {
        console.log(`name = ${this._name} index = ${index}`);
    }
}

// 测试函数
function main() {
    const s = new concreteSubject();

    const o1 = new concreteObserver(s, 'Tom');
    const o2 = new concreteObserver(s, 'Jack');
    const o3 = new concreteObserver(s, 'Mark');

    // s.removeListener(o2);

    console.log('1s后输出：');

    setTimeout(() => {
        s.notify();
    }, 1000)
}

// 测试执行
main();