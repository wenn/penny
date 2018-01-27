function mixin(...mixins) {
  return mixins.reduce((base, mixin) => {
    return mixin(base);
  }, class { });
}

export default mixin;