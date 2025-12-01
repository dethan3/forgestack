# 综合挑战 01：类继承体系

## 🎯 挑战目标

设计并实现一个完整的类继承体系，模拟游戏角色系统。

## 📋 需求说明

实现 `gameClasses.js` 中的所有类：

### 1. `Character` 基类
游戏角色基类

```javascript
const hero = new Character('Hero', 100, 10);
hero.name;      // 'Hero'
hero.hp;        // 100
hero.attack;    // 10
hero.isAlive;   // true
hero.takeDamage(30);  // hp = 70
hero.heal(20);        // hp = 90
```

### 2. `Warrior` 继承 Character
战士类

```javascript
const warrior = new Warrior('Conan', 150, 15, 20);
warrior.defense;  // 20
warrior.takeDamage(30);  // 实际伤害 30-20=10
warrior.rage();   // 暴怒，攻击力翻倍
```

### 3. `Mage` 继承 Character
法师类

```javascript
const mage = new Mage('Gandalf', 80, 5, 100);
mage.mana;  // 100
mage.castSpell(damage, cost);  // 消耗法力造成伤害
mage.meditate();  // 恢复法力
```

### 4. `Boss` 继承 Character
Boss 类

```javascript
const boss = new Boss('Dragon', 500, 30, ['Fire Breath', 'Tail Swipe']);
boss.skills;  // ['Fire Breath', 'Tail Swipe']
boss.useSkill(skillName);  // 使用技能
```

## ⏱️ 预计时间

60-90 分钟

## 🚀 开始挑战

1. 编辑 `gameClasses.js` 实现功能
2. 运行测试：`pnpm test chapters/06-prototypes-classes/challenges`
3. 所有测试通过即为完成

## 💡 提示

- Character 作为基类定义通用属性和方法
- 子类通过 super() 调用父类构造函数
- 合理使用私有字段保护数据
