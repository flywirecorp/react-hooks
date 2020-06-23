import validate from './validate';

describe('validate', () => {
  describe('length', () => {
    const constraints = {
      test: {
        length: {
          minimum: 2,
          message: '^is required',
        },
      },
    };

    test('returns an error when length is shorter than minimum', () => {
      const payload = {
        test: 'A',
      };

      expect(validate(payload, constraints)).toEqual({
        test: ['is required'],
      });
    });

    test('returns no error when length is not longer or equal to the minimum', () => {
      const payload = {
        test: 'ABC',
      };

      expect(validate(payload, constraints)).toBeUndefined();
    });
  });

  describe('presence', () => {
    const constraints = { test: { presence: { message: '^is required' } } };

    test('returns an error when field is blank', () => {
      const payload = { test: '' };

      expect(validate(payload, constraints)).toEqual({ test: ['is required'] });
    });

    test('returns an error when field is no present', () => {
      const payload = {};

      expect(validate(payload, constraints)).toEqual({ test: ['is required'] });
    });

    test('returns no error when the field has content', () => {
      const payload = { test: 'Miriam' };

      expect(validate(payload, constraints)).toBeUndefined();
    });
  });

  describe('date', () => {
    const constraints = {
      birthday: { date: { message: '^is not a valid date' } },
    };

    test('returns no error when field is blank', () => {
      const payload = {
        birthday: '',
      };

      expect(validate(payload, constraints)).toBeUndefined();
    });

    test('returns no error when field is no present', () => {
      const payload = {};

      expect(validate(payload, constraints)).toBeUndefined();
    });

    test('returns no error when the field has a valid date', () => {
      const payload = {
        birthday: '02/29/2016',
      };

      expect(validate(payload, constraints)).toBeUndefined();
    });

    test('returns an error when the field has an incomplete date', () => {
      const payload = {
        birthday: '02/29/201',
      };

      expect(validate(payload, constraints)).toEqual({
        birthday: ['is not a valid date'],
      });
    });

    test('returns an error when the field has an invalid date', () => {
      const payload = {
        birthday: '02/29/2017',
      };

      expect(validate(payload, constraints)).toEqual({
        birthday: ['is not a valid date'],
      });
    });
  });

  describe('format', () => {
    const constraints = {
      test: {
        customFormat: {
          pattern: '^[A-Z]',
          message: '^should start with upper case',
        },
      },
    };

    test('returns no error when field is blank', () => {
      const payload = {
        test: '',
      };

      expect(validate(payload, constraints)).toBeUndefined();
    });

    test('returns no error when field is no present', () => {
      const payload = {};

      expect(validate(payload, constraints)).toBeUndefined();
    });

    test('returns an error when the field does not match the pattern', () => {
      const payload = {
        test: 'miriam',
      };

      expect(validate(payload, constraints)).toEqual({
        test: ['should start with upper case'],
      });
    });

    test('returns no error when the field matches the pattern', () => {
      const payload = {
        test: 'Miriam',
      };

      expect(validate(payload, constraints)).toBeUndefined();
    });

    describe('unicode regex', () => {
      const constraints = {
        test: {
          customFormat: {
            pattern: '^[^\\p{Han}|\\p{Katakana}|\\p{Hangul}]+$',
            message: "^can't be a chinesse/japanesse character",
          },
        },
      };

      test('returns an error', () => {
        const payload = {
          test: 'ホラ',
        };

        expect(validate(payload, constraints)).toEqual({
          test: ["can't be a chinesse/japanesse character"],
        });
      });

      test('returns no error', () => {
        const payload = {
          test: 'Juanito',
        };

        expect(validate(payload, constraints)).toBeUndefined();
      });
    });

    describe('supports \\A modifier', () => {
      const constraints = {
        test: {
          customFormat: {
            pattern: '\\A[0-9]',
            message: '^should start with number',
          },
        },
      };

      const expectedValidationErrors = {
        test: ['should start with number'],
      };

      test('returns an error', () => {
        const payload = { test: 'B123' };

        expect(validate(payload, constraints)).toEqual(
          expectedValidationErrors,
        );
      });

      test('does not show an error', () => {
        const payload = { test: '123' };

        expect(validate(payload, constraints)).toBeUndefined();
      });
    });

    describe('supports \\Z modifier', () => {
      const constraints = {
        test: {
          customFormat: {
            pattern: '[0-9]\\Z',
            message: '^should end with number',
          },
        },
      };

      test('returns an error', () => {
        const payload = { test: '123B' };

        expect(validate(payload, constraints)).toEqual({
          test: ['should end with number'],
        });
      });

      test('does not return an error', () => {
        const payload = { test: '123' };

        expect(validate(payload, constraints)).toBeUndefined();
      });
    });

    describe('supports (?i) modifier', () => {
      const constraints = {
        test: {
          customFormat: {
            pattern: '^(8d{8}|(?i)eli|(?i)mdi)$',
          },
        },
      };

      test('does not return an error', () => {
        const payload = { test: 'eli' };

        expect(validate(payload, constraints)).toBeUndefined();
      });

      test('does not return an error', () => {
        const payload = { test: 'ELI' };

        expect(validate(payload, constraints)).toBeUndefined();
      });
    });

    describe('invalid regular expresion', () => {
      const constraints = {
        test: {
          customFormat: {
            pattern: '//\\',
          },
        },
      };

      test('bypasses the validation', () => {
        const payload = { test: 'foo' };

        expect(validate(payload, constraints)).toBeUndefined();
      });
    });
  });
});
