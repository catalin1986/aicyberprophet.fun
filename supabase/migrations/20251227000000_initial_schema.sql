-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address VARCHAR(48) UNIQUE NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);

-- Create Tokens Table
CREATE TABLE IF NOT EXISTS tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    address VARCHAR(48) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(10) NOT NULL,
    supply BIGINT NOT NULL,
    decimals INTEGER NOT NULL DEFAULT 6,
    image_url TEXT,
    metadata_uri TEXT,
    creator_id UUID REFERENCES users(id),
    mint_authority BOOLEAN DEFAULT true,
    freeze_authority BOOLEAN DEFAULT true,
    update_authority BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tokens_creator ON tokens(creator_id);
CREATE INDEX IF NOT EXISTS idx_tokens_address ON tokens(address);
CREATE INDEX IF NOT EXISTS idx_tokens_symbol ON tokens(symbol);

-- Create Airdrop History Table
CREATE TABLE IF NOT EXISTS airdrop_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_id UUID REFERENCES tokens(id),
    recipients JSONB NOT NULL,
    total_amount BIGINT NOT NULL,
    transaction_signature VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_airdrop_token ON airdrop_history(token_id);
CREATE INDEX IF NOT EXISTS idx_airdrop_created ON airdrop_history(created_at DESC);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE airdrop_history ENABLE ROW LEVEL SECURITY;

-- Create Policies (Permissive for now to ensure MVP works without complex Auth setup)
-- Users
CREATE POLICY "Users are viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert themselves" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update themselves" ON users FOR UPDATE USING (true);

-- Tokens
CREATE POLICY "Tokens are viewable by everyone" ON tokens FOR SELECT USING (true);
CREATE POLICY "Users can create tokens" ON tokens FOR INSERT WITH CHECK (true);
CREATE POLICY "Creator can update tokens" ON tokens FOR UPDATE USING (true);

-- Airdrop History
CREATE POLICY "Airdrops are viewable by everyone" ON airdrop_history FOR SELECT USING (true);
CREATE POLICY "Users can insert airdrops" ON airdrop_history FOR INSERT WITH CHECK (true);

-- Grant Permissions to anon and authenticated roles (Critical for Supabase to work with client-side requests)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;
