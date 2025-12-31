ALTER TABLE tokens ADD COLUMN IF NOT EXISTS creator_wallet VARCHAR;
CREATE INDEX IF NOT EXISTS idx_tokens_creator_wallet ON tokens(creator_wallet);
