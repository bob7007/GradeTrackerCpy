import { createTamagui, createTokens } from 'tamagui';

const tokens = createTokens({
    space: {
        sm: 4,
        md: 8,
        lg: 16,
        true: 8,
    },
    size: {
        sm: 12,
        md: 14,
        lg: 18,
        true: 14,
    },
    color: {
        primary: '#007aff',
        secondary: '#ff2d55',
        background: '#ffffff',
        text: '#333333',
    },
});

const config = createTamagui({
    tokens,
    themes: {
        light: {
            background: '$background',
            text: '$text',
        },
    },
});

export default config;
