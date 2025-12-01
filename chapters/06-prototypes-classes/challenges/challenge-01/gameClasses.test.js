import { describe, it, expect } from 'vitest';
import { Character, Warrior, Mage, Boss, Party } from './gameClasses.js';

describe('综合挑战 01: 游戏角色类系统', () => {
  describe('Character 基类', () => {
    it('创建角色', () => {
      const hero = new Character('Hero', 100, 10);
      expect(hero.name).toBe('Hero');
      expect(hero.hp).toBe(100);
      expect(hero.maxHp).toBe(100);
      expect(hero.attack).toBe(10);
      expect(hero.isAlive).toBe(true);
    });

    it('受到伤害', () => {
      const hero = new Character('Hero', 100, 10);
      hero.takeDamage(30);
      expect(hero.hp).toBe(70);
    });

    it('死亡', () => {
      const hero = new Character('Hero', 100, 10);
      hero.takeDamage(150);
      expect(hero.hp).toBe(0);
      expect(hero.isAlive).toBe(false);
    });

    it('治疗', () => {
      const hero = new Character('Hero', 100, 10);
      hero.takeDamage(50);
      hero.heal(30);
      expect(hero.hp).toBe(80);
    });

    it('治疗不超过最大生命值', () => {
      const hero = new Character('Hero', 100, 10);
      hero.takeDamage(10);
      hero.heal(50);
      expect(hero.hp).toBe(100);
    });

    it('攻击目标', () => {
      const attacker = new Character('Attacker', 100, 20);
      const target = new Character('Target', 100, 10);
      attacker.attackTarget(target);
      expect(target.hp).toBe(80);
    });
  });

  describe('Warrior 战士类', () => {
    it('继承 Character', () => {
      const warrior = new Warrior('Conan', 150, 15, 20);
      expect(warrior instanceof Character).toBe(true);
      expect(warrior.name).toBe('Conan');
      expect(warrior.defense).toBe(20);
    });

    it('防御减伤', () => {
      const warrior = new Warrior('Conan', 150, 15, 20);
      warrior.takeDamage(30);
      expect(warrior.hp).toBe(140); // 150 - (30-20) = 140
    });

    it('最小伤害为 1', () => {
      const warrior = new Warrior('Conan', 150, 15, 50);
      warrior.takeDamage(30);
      expect(warrior.hp).toBe(149); // 至少受到 1 点伤害
    });

    it('暴怒', () => {
      const warrior = new Warrior('Conan', 150, 15, 20);
      expect(warrior.isRaging).toBe(false);
      warrior.rage();
      expect(warrior.isRaging).toBe(true);
      expect(warrior.attack).toBe(30);
    });

    it('暴怒只能使用一次', () => {
      const warrior = new Warrior('Conan', 150, 15, 20);
      warrior.rage();
      warrior.rage();
      expect(warrior.attack).toBe(30); // 不会变成 60
    });
  });

  describe('Mage 法师类', () => {
    it('继承 Character', () => {
      const mage = new Mage('Gandalf', 80, 5, 100);
      expect(mage instanceof Character).toBe(true);
      expect(mage.mana).toBe(100);
      expect(mage.maxMana).toBe(100);
    });

    it('施法攻击', () => {
      const mage = new Mage('Gandalf', 80, 5, 100);
      const target = new Character('Enemy', 100, 10);

      const result = mage.castSpell(target, 40, 30);
      expect(result).toBe(true);
      expect(mage.mana).toBe(70);
      expect(target.hp).toBe(60);
    });

    it('法力不足无法施法', () => {
      const mage = new Mage('Gandalf', 80, 5, 20);
      const target = new Character('Enemy', 100, 10);

      const result = mage.castSpell(target, 40, 30);
      expect(result).toBe(false);
      expect(mage.mana).toBe(20);
      expect(target.hp).toBe(100);
    });

    it('冥想恢复法力', () => {
      const mage = new Mage('Gandalf', 80, 5, 100);
      mage.castSpell(new Character('', 100, 0), 10, 50);
      mage.meditate();
      expect(mage.mana).toBe(80);
    });

    it('冥想不超过最大法力', () => {
      const mage = new Mage('Gandalf', 80, 5, 100);
      mage.meditate();
      expect(mage.mana).toBe(100);
    });
  });

  describe('Boss 类', () => {
    it('继承 Character', () => {
      const boss = new Boss('Dragon', 500, 30, ['Fire Breath', 'Tail Swipe']);
      expect(boss instanceof Character).toBe(true);
      expect(boss.skills).toEqual(['Fire Breath', 'Tail Swipe']);
    });

    it('使用技能', () => {
      const boss = new Boss('Dragon', 500, 30, ['Fire Breath', 'Tail Swipe']);

      const skill1 = boss.useSkill('Fire Breath');
      expect(skill1.skill).toBe('Fire Breath');
      expect(skill1.damage).toBe(30); // 30 * (1 + 0*0.5)

      const skill2 = boss.useSkill('Tail Swipe');
      expect(skill2.skill).toBe('Tail Swipe');
      expect(skill2.damage).toBe(45); // 30 * (1 + 1*0.5)
    });

    it('无效技能返回 null', () => {
      const boss = new Boss('Dragon', 500, 30, ['Fire Breath']);
      expect(boss.useSkill('Unknown')).toBe(null);
    });

    it('狂暴', () => {
      const boss = new Boss('Dragon', 500, 30, ['Fire Breath']);
      boss.takeDamage(400); // hp = 100, 20%
      boss.enrage();
      expect(boss.attack).toBe(45); // 30 * 1.5
    });
  });

  describe('Party 队伍类', () => {
    it('创建队伍', () => {
      const party = new Party('Heroes');
      expect(party.name).toBe('Heroes');
      expect(party.members).toEqual([]);
    });

    it('添加和移除成员', () => {
      const party = new Party('Heroes');
      const hero = new Character('Hero', 100, 10);
      const mage = new Mage('Mage', 80, 5, 100);

      party.addMember(hero);
      party.addMember(mage);
      expect(party.members.length).toBe(2);

      party.removeMember(hero);
      expect(party.members.length).toBe(1);
    });

    it('获取存活成员', () => {
      const party = new Party('Heroes');
      const hero1 = new Character('Hero1', 100, 10);
      const hero2 = new Character('Hero2', 100, 10);

      party.addMember(hero1);
      party.addMember(hero2);

      hero1.takeDamage(200);
      expect(party.aliveMembers.length).toBe(1);
    });

    it('总生命值', () => {
      const party = new Party('Heroes');
      party.addMember(new Character('Hero1', 100, 10));
      party.addMember(new Character('Hero2', 150, 10));
      expect(party.totalHp).toBe(250);
    });

    it('队伍全灭', () => {
      const party = new Party('Heroes');
      const hero = new Character('Hero', 100, 10);
      party.addMember(hero);

      expect(party.isWiped).toBe(false);
      hero.takeDamage(200);
      expect(party.isWiped).toBe(true);
    });
  });
});
