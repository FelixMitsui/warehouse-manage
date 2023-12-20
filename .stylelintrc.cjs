module.exports = {
    extends: [
        'stylelint-config-standard',             // Use the standard stylelint configuration.
        'stylelint-config-html/vue',             // Configure stylelint for styles in Vue templates.
        'stylelint-config-standard-scss',        // Use the standard stylelint configuration for SCSS.
        'stylelint-config-recommended-vue/scss', // Use the recommended stylelint configuration for SCSS in Vue.
        'stylelint-config-recess-order',         // Use the Recess order configuration for stylelint, which defines the order of CSS properties.
        'stylelint-config-prettier',             // Use stylelint configuration that is compatible with Prettier, ensuring no conflicts between stylelint and Prettier.
    ]
    ],
    overrides: [
        {
            files: ['**/*.(scss|css|vue|html)'],
            customSyntax: 'postcss-scss',
        },
        {
            files: ['**/*.(html|vue)'],
            customSyntax: 'postcss-html',
        },
    ],
    ignoreFiles: [
        '**/*.js',
        '**/*.jsx',
        '**/*.tsx',
        '**/*.ts',
        '**/*.json',
        '**/*.md',
        '**/*.yaml',
    ],
    rules: {
        [
            'value-keyword-case': null, // Allow the use of v-bind in CSS without reporting an error.
        'no-descending-specificity': null, // Disallow lower specificity selectors that override higher specificity selectors.
        'function-url-quotes': 'always', // Require quotes "always" or forbid quotes "never" around URLs.
        'no-empty-source': null, // Disable the rule that prohibits empty source files.
        'selector-class-pattern': null, // Disable enforcing a specific format for selector class names.
        'property-no-unknown': null, // Allow unknown properties (true to disallow).
        'block-opening-brace-space-before': 'always', // Require one space before the opening brace or disallow whitespace before it.
        'value-no-vendor-prefix': null, // Disable the rule that disallows vendor prefixes in property values.
        'property-no-vendor-prefix': null, // Disable the rule that disallows vendor prefixes in property names.
        'selector-pseudo-class-no-unknown': [
            // Disallow unknown pseudo-classes.
            true,
            {
                ignorePseudoClasses: ['global', 'v-deep', 'deep'], // Ignore specific pseudo-classes (useful when modifying default styles in the 'element' selector).
            },
        ],
          ]
    },
}