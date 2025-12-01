import { describe, it, expect } from 'vitest';
import {
  getPrototypeChain,
  hasOwnProp,
  Person,
  Animal,
  Dog,
  createPerson,
  createPureObject,
  isInstanceOf,
  getConstructorName,
} from './01-prototypes.js';

describe('01-prototypes: 原型基础', () => {
  describe('练习 1: 原型操作', () => {
    it('getPrototypeChain 获取原型链', () => {
      const chain = getPrototypeChain({});
      expect(chain.length).toBe(2);
      expect(chain[0]).toBe(Object.prototype);
      expect(chain[1]).toBe(null);
    });

    it('hasOwnProp 检查自有属性', () => {
      const obj = { a: 1 };
      expect(hasOwnProp(obj, 'a')).toBe(true);
      expect(hasOwnProp(obj, 'toString')).toBe(false);
    });
  });

  describe('练习 2: 构造函数', () => {
    it('Person 构造函数', () => {
      const alice = new Person('Alice', 25);
      expect(alice.name).toBe('Alice');
      expect(alice.age).toBe(25);
      expect(alice.greet()).toBe("Hello, I'm Alice");
      expect(alice.getAge()).toBe(25);
    });

    it('Person 方法在原型上', () => {
      const p1 = new Person('A', 1);
      const p2 = new Person('B', 2);
      expect(p1.greet).toBe(p2.greet);
    });

    it('Animal 构造函数', () => {
      const animal = new Animal('Cat');
      expect(animal.speak()).toBe('Cat makes a sound');
    });
  });

  describe('练习 3: 原型继承', () => {
    it('Dog 继承 Animal', () => {
      const dog = new Dog('Buddy', 'Labrador');
      expect(dog.name).toBe('Buddy');
      expect(dog.breed).toBe('Labrador');
    });

    it('Dog 重写 speak', () => {
      const dog = new Dog('Buddy', 'Labrador');
      expect(dog.speak()).toBe('Buddy barks');
    });

    it('Dog 添加 fetch 方法', () => {
      const dog = new Dog('Buddy', 'Labrador');
      expect(dog.fetch()).toBe('Buddy fetches the ball');
    });

    it('Dog 是 Animal 的实例', () => {
      const dog = new Dog('Buddy', 'Labrador');
      expect(dog instanceof Dog).toBe(true);
      expect(dog instanceof Animal).toBe(true);
    });
  });

  describe('练习 4: Object.create', () => {
    it('createPerson 创建带原型的对象', () => {
      const person = createPerson('Alice');
      expect(person.name).toBe('Alice');
      expect(typeof person.greet).toBe('function');
      expect(person.greet()).toContain('Alice');
    });

    it('createPureObject 创建无原型对象', () => {
      const obj = createPureObject();
      expect(Object.getPrototypeOf(obj)).toBe(null);
      expect(obj.toString).toBe(undefined);
    });
  });

  describe('练习 5: 检查原型关系', () => {
    it('isInstanceOf 检查实例', () => {
      const arr = [];
      expect(isInstanceOf(arr, Array)).toBe(true);
      expect(isInstanceOf(arr, Object)).toBe(true);
      expect(isInstanceOf(arr, String)).toBe(false);
    });

    it('getConstructorName 获取构造函数名', () => {
      expect(getConstructorName([])).toBe('Array');
      expect(getConstructorName({})).toBe('Object');
      expect(getConstructorName(new Person('A', 1))).toBe('Person');
    });
  });
});
