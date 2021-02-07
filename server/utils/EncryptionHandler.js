const crypto = require('crypto');
const secret = 'pppppppppppppppppppppppppppppppp';

const algorithm = 'aes-256-ctr';

// Encryption
const encrypt = (password) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secret), iv);
  const encPassword = Buffer.concat([cipher.update(password), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    password: encPassword.toString('hex'),
  };
};

// Decryption
const decrypt = (encryption) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secret),
    Buffer.from(encryption.iv, 'hex')
  );

  const decPassword = Buffer.concat([
    [decipher.update(Buffer.from(encryption.password, 'hex'))],
    decipher.final(),
  ]);

  return decPassword.toString();
};

module.exports = { encrypt, decrypt };
