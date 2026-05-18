import antfu from '@antfu/eslint-config'

export default antfu({
  nextjs: true,
  typescript: true,
  test: true,
  ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  rules: {
    'style/max-len': ['error', { code: 160, ignoreUrls: true }],
  },
})
