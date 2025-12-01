/**
 * 综合挑战 01：游戏角色类系统
 *
 * 实现一个完整的游戏角色继承体系
 */

// ============================================
// 1. Character 基类
// ============================================

/**
 * 游戏角色基类
 * @param {string} name - 角色名称
 * @param {number} hp - 生命值
 * @param {number} attack - 攻击力
 */
export class Character {
  // TODO: 实现基类
  // - name, hp, maxHp, attack 属性
  // - get isAlive() 返回 hp > 0
  // - takeDamage(amount) 受到伤害
  // - heal(amount) 治疗（不超过 maxHp）
  // - attackTarget(target) 攻击目标
}

// ============================================
// 2. Warrior 战士类
// ============================================

/**
 * 战士类
 * @param {string} name
 * @param {number} hp
 * @param {number} attack
 * @param {number} defense - 防御力
 */
export class Warrior extends Character {
  // TODO: 实现战士类
  // - defense 属性
  // - 重写 takeDamage，伤害减去防御值
  // - rage() 暴怒模式，攻击力翻倍（只能使用一次）
  // - isRaging 属性
}

// ============================================
// 3. Mage 法师类
// ============================================

/**
 * 法师类
 * @param {string} name
 * @param {number} hp
 * @param {number} attack
 * @param {number} mana - 法力值
 */
export class Mage extends Character {
  // TODO: 实现法师类
  // - mana, maxMana 属性
  // - castSpell(target, damage, cost) 施法攻击
  //   - 法力不足返回 false
  //   - 成功则消耗法力，对目标造成伤害，返回 true
  // - meditate() 冥想恢复 30 法力
}

// ============================================
// 4. Boss 类
// ============================================

/**
 * Boss 类
 * @param {string} name
 * @param {number} hp
 * @param {number} attack
 * @param {string[]} skills - 技能列表
 */
export class Boss extends Character {
  // TODO: 实现 Boss 类
  // - skills 属性
  // - useSkill(skillName) 使用技能
  //   - 返回 { skill, damage }
  //   - 伤害为 attack * (1 + 技能索引 * 0.5)
  //   - 技能不存在返回 null
  // - enrage() 狂暴，hp 低于 30% 时攻击力 +50%
}

// ============================================
// 5. Party 队伍类
// ============================================

/**
 * 队伍类（组合模式）
 * @param {string} name - 队伍名称
 */
export class Party {
  // TODO: 实现队伍类
  // - name 属性
  // - members 数组
  // - addMember(character)
  // - removeMember(character)
  // - get aliveMembers() 返回存活成员
  // - get totalHp() 返回总生命值
  // - get isWiped() 返回是否全灭
}
