/**
 * 根据分类唯一信息构建稳定种子。
 * @param {string|number} id 分类主键。
 * @param {string} name 分类名称。
 * @returns {string} 返回用于颜色计算的字符串种子。
 */
const buildCategorySeed = (id, name) => `${id}-${name}`;

/**
 * 将字符串种子转换为稳定哈希值。
 * @param {string} seed 颜色计算种子。
 * @returns {number} 返回有符号整型哈希值。
 */
const buildSeedHash = (seed) => {
  /**
   * 当前累计哈希值。
   * 取值范围：JavaScript Number 整数区间。
   */
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = seed.charCodeAt(index) + ((hash << 5) - hash);
  }

  return hash;
};

/**
 * 将单个 HSL 色相通道转换为 RGB 通道值。
 * @param {number} p 辅助参数 p。
 * @param {number} q 辅助参数 q。
 * @param {number} t 当前色相位置。
 * @returns {number} 返回 0 到 1 之间的 RGB 通道值。
 */
const convertHueToRgb = (p, q, t) => {
  if (t < 0) {
    return convertHueToRgb(p, q, t + 1);
  }

  if (t > 1) {
    return convertHueToRgb(p, q, t - 1);
  }

  if (t < 1 / 6) {
    return p + ((q - p) * 6 * t);
  }

  if (t < 1 / 2) {
    return q;
  }

  if (t < 2 / 3) {
    return p + (((2 / 3) - t) * 6 * (q - p));
  }

  return p;
};

/**
 * 将 0 到 1 的颜色通道值格式化为两位十六进制。
 * @param {number} channel 颜色通道值。
 * @returns {string} 返回两位十六进制字符串。
 */
const toHexChannel = (channel) => {
  /**
   * 当前通道对应的十六进制字符串。
   * 取值范围：`00` 到 `ff`。
   */
  const hex = Math.round(channel * 255).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

/**
 * 将稳定哈希值转换为亮色系十六进制颜色。
 * @param {number} hash 分类种子哈希值。
 * @returns {string} 返回十六进制颜色字符串。
 */
const convertHashToHexColor = (hash) => {
  /**
   * 当前颜色的 HSL 色相值。
   * 取值范围：0 到 1。
   */
  const hue = (Math.abs(hash) % 360) / 360;
  /**
   * 当前颜色的 HSL 饱和度。
   * 取值范围：0 到 1。
   */
  const saturation = (65 + (Math.abs(hash >> 8) % 20)) / 100;
  /**
   * 当前颜色的 HSL 亮度。
   * 取值范围：0 到 1。
   */
  const lightness = (60 + (Math.abs(hash >> 16) % 15)) / 100;

  if (saturation === 0) {
    const channelHex = toHexChannel(lightness);
    return `#${channelHex}${channelHex}${channelHex}`;
  }

  /**
   * HSL 转 RGB 过程中的辅助高值。
   * 取值范围：0 到 1。
   */
  const q = lightness < 0.5
    ? lightness * (1 + saturation)
    : lightness + saturation - (lightness * saturation);
  /**
   * HSL 转 RGB 过程中的辅助低值。
   * 取值范围：0 到 1。
   */
  const p = (2 * lightness) - q;
  /**
   * 红色通道值。
   * 取值范围：0 到 1。
   */
  const red = convertHueToRgb(p, q, hue + (1 / 3));
  /**
   * 绿色通道值。
   * 取值范围：0 到 1。
   */
  const green = convertHueToRgb(p, q, hue);
  /**
   * 蓝色通道值。
   * 取值范围：0 到 1。
   */
  const blue = convertHueToRgb(p, q, hue - (1 / 3));

  return `#${toHexChannel(red)}${toHexChannel(green)}${toHexChannel(blue)}`;
};

/**
 * 计算分类稳定展示色。
 * @param {string|number} id 分类主键。
 * @param {string} name 分类名称。
 * @returns {string} 返回十六进制颜色值。
 * @description 同一分类在任意页面都会得到同一颜色，用于视觉识别。
 */
export const getCategoryColor = (id, name) => {
  /**
   * 当前分类颜色种子。
   * 取值范围：由分类主键和名称拼接出的字符串。
   */
  const categorySeed = buildCategorySeed(id, name);
  /**
   * 当前分类颜色哈希值。
   * 取值范围：JavaScript Number 整数区间。
   */
  const categoryHash = buildSeedHash(categorySeed);
  return convertHashToHexColor(categoryHash);
};
