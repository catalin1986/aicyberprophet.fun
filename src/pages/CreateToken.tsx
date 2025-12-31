import { FC, useState, useRef, useEffect } from 'react';
import { Upload, X, Check, ArrowRight, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { useTokenFactory, TokenFormData } from '@/hooks/useTokenFactory';
import { SuccessModal } from '@/components/SuccessModal';
import { SEO } from '@/components/SEO';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CreateToken: FC = () => {
  const wallet = useWallet();
  const { createToken, isLoading, error, success } = useTokenFactory();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<TokenFormData>({
    name: '',
    symbol: '',
    description: '',
    image: null,
    // @ts-ignore
    previewUrl: null as string | null,
    supply: '',
    decimals: '9',
    revokeMint: false,
    revokeFreeze: false,
    revokeUpdate: false,
    creatorName: '',
    creatorWebsite: '',
    twitter: '',
    telegram: '',
    discord: '',
    website: '',
    referrer: searchParams.get('ref') || null,
  });
  const [showCreatorInfo, setShowCreatorInfo] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [createdToken, setCreatedToken] = useState<{
    name: string;
    symbol: string;
    mint: string;
    image: string | null;
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'File size must be less than 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: file, previewUrl: reader.result as string }));
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.image;
          return newErrors;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'File size must be less than 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: file, previewUrl: reader.result as string }));
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.image;
          return newErrors;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Token name is required';
    if (!formData.symbol) newErrors.symbol = 'Token symbol is required';
    if (!formData.image) newErrors.image = 'Token logo is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleCreateToken = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      toast.error('Please connect your wallet first!');
      return;
    }

    const toastId = toast.loading('Initializing token creation...');

    try {
      const result = await createToken(formData);
      toast.success(`Token Created! Address: ${result?.mint}`, { id: toastId });
      setCreatedToken({
        name: formData.name,
        symbol: formData.symbol,
        mint: result?.mint,
        image: formData.previewUrl,
      });
    } catch (err: any) {
      toast.error(err.message || 'Failed to create token', { id: toastId });
    }
  };


  return (
    <div className="min-h-screen relative flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Create Solana Token | SPL Token Creator"
        description="Launch your own Solana SPL Token in less than 1 minute. No coding required. Supports revoking mint/freeze authority."
        keywords="create solana token, spl token generator, solana token creator, no code token launch"
      />

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-4 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Base fee: 2 AICP + 1 AICP per Authority
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-primary to-purple-500">
            Create Your Solana Token
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Fill out the form below to create your custom token in seconds
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                step === s
                  ? "bg-primary border-primary text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                  : step > s
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-secondary border-border text-muted-foreground"
              )}
            >
              {step > s ? <Check className="w-5 h-5" /> : s}
            </div>
            {s < 3 && (
              <div
                className={cn(
                  "w-12 h-0.5 mx-2 transition-colors duration-300",
                  step > s ? "bg-green-500" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Main Card */}
      <div className="w-full max-w-2xl bg-card/50 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden relative z-10">
        {createdToken && (
          <SuccessModal
            isOpen={true}
            onClose={() => setCreatedToken(null)}
            tokenData={{
                name: createdToken.name,
                symbol: createdToken.symbol,
                mint: createdToken.mint,
                image: createdToken.image
            }}
          />
        )}
        {step === 1 && (
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                Step 1: Basic Token Information
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground bg-secondary/30 p-4 rounded-lg border border-border/50">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span> Enter your desired token name
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span> Choose a symbol (ticker) - maximum 8 characters
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span> Upload a token logo (recommended: 512x512px or 1024x1024px)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span> Supported formats: PNG, JPG, JPEG (max 2MB)
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Token Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. AiCyberProphet"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={cn(
                    "w-full px-4 py-3 bg-secondary/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                    errors.name ? "border-destructive focus:ring-destructive/50" : "border-border"
                  )}
                />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Token Symbol <span className="text-destructive">*</span> (max 8 chars)
                  </label>
                  <input
                    type="text"
                    maxLength={8}
                    placeholder="e.g. QM"
                    value={formData.symbol}
                    onChange={(e) => {
                      setFormData({ ...formData, symbol: e.target.value.toUpperCase() });
                      if (errors.symbol) setErrors({ ...errors, symbol: '' });
                    }}
                    className={cn(
                      "w-full px-4 py-3 bg-secondary/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
                      errors.symbol ? "border-destructive focus:ring-destructive/50" : "border-border"
                    )}
                  />
                  {errors.symbol && (
                    <p className="text-xs text-destructive mt-1">{errors.symbol}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Token Logo <span className="text-destructive">*</span>
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={cn(
                    "w-full h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-secondary/50 group relative overflow-hidden",
                    errors.image ? "border-destructive bg-destructive/5" : "border-border bg-secondary/20"
                  )}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleImageUpload}
                  />
                  
                  {formData.previewUrl ? (
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                      <img 
                        src={formData.previewUrl} 
                        alt="Preview" 
                        className="max-h-full max-w-full object-contain rounded-lg shadow-lg" 
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium">
                        Click to change
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                      <div className="p-4 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
                        <Upload className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium">Drop your logo here</p>
                        <p className="text-xs mt-1 text-muted-foreground/70">
                          Recommended: 512x512px or 1024x1024px
                        </p>
                        <p className="text-xs text-muted-foreground/70">
                          PNG, JPG, up to 2MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {errors.image && (
                  <p className="text-xs text-destructive mt-1 text-center">{errors.image}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                Step 2: Token Configuration
              </h2>
              <div className="space-y-2 text-sm text-muted-foreground bg-secondary/30 p-4 rounded-lg border border-border/50">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span> Set decimals (9 recommended for most tokens)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span> Specify total supply - this is the initial amount of tokens
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span> Add a description to explain your token's purpose
                  </li>
                </ul>
                <p className="text-yellow-500/90 text-xs mt-3 pt-3 border-t border-border/50">
                  Decimals determine how divisible your token is (e.g., 9 decimals means smallest unit is 0.000000001)
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Decimals <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="9"
                  placeholder="9"
                  value={formData.decimals}
                  onChange={(e) => setFormData({ ...formData, decimals: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <p className="text-xs text-muted-foreground">Enter a value between 0 and 9 (default: 9)</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Total Supply <span className="text-destructive">*</span>
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 1000000000"
                  value={formData.supply}
                  onChange={(e) => setFormData({ ...formData, supply: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Description
                </label>
                <textarea
                  placeholder="Describe your token's purpose and vision..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground text-right">
                  {1000 - formData.description.length} characters remaining
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground font-semibold rounded-lg transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
            <div className="p-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
                Step 3: Token Authorities
              </h2>
              <div className="space-y-2 text-sm text-muted-foreground bg-secondary/30 p-4 rounded-lg border border-border/50">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span> <strong className="text-foreground">Revoke Freeze Authority</strong> - Prevents freezing of token accounts (+10,000 AICP)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span> <strong className="text-foreground">Revoke Mint Authority</strong> - Prevents creating more tokens (+10,000 AICP)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span> <strong className="text-foreground">Revoke Update Authority</strong> - Prevents metadata changes (+10,000 AICP)
                  </li>
                </ul>
                <p className="text-yellow-500/90 text-xs mt-3 pt-3 border-t border-border/50">
                  Revoking authorities increases trust but restricts future changes
                </p>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-4">
              <div className="rounded-lg bg-secondary/20 border border-border/50 overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary/30 transition-colors"
                  onClick={() => {
                    setShowCreatorInfo(!showCreatorInfo);
                    // Clear data if toggled off? Or keep it? Keeping it but not sending it would require logic in hook. 
                    // For now, let's just toggle visibility. Hook checks data presence.
                    // If user toggles OFF, we should probably clear the data so they don't get charged.
                    if (showCreatorInfo) {
                      setFormData(prev => ({ ...prev, creatorName: '', creatorWebsite: '' }));
                    }
                  }}
                >
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm">Modify Creator Info (+10,000 AICP)</div>
                    <div className="text-xs text-muted-foreground">Customise the creator details for your token</div>
                  </div>
                  <div className={cn(
                    "w-10 h-6 rounded-full relative transition-colors duration-300",
                    showCreatorInfo ? "bg-primary" : "bg-secondary"
                  )}>
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                      showCreatorInfo ? "left-5" : "left-1"
                    )} />
                  </div>
                </div>
                
                {showCreatorInfo && (
                  <div className="p-4 pt-0 space-y-4 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Creator Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Satoshi Nakamoto"
                        value={formData.creatorName}
                        onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                        className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Creator Website</label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={formData.creatorWebsite}
                        onChange={(e) => setFormData({ ...formData, creatorWebsite: e.target.value })}
                        className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="rounded-lg bg-secondary/20 border border-border/50 overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-secondary/30 transition-colors"
                  onClick={() => {
                    setShowSocialLinks(!showSocialLinks);
                    if (showSocialLinks) {
                      setFormData(prev => ({ ...prev, twitter: '', telegram: '', discord: '', website: '' }));
                    }
                  }}
                >
                  <div className="space-y-0.5">
                    <div className="font-medium text-sm">Add Social Links</div>
                    <div className="text-xs text-muted-foreground">Add social media links for your token project</div>
                  </div>
                  <div className={cn(
                    "w-10 h-6 rounded-full relative transition-colors duration-300",
                    showSocialLinks ? "bg-primary" : "bg-secondary"
                  )}>
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300",
                      showSocialLinks ? "left-5" : "left-1"
                    )} />
                  </div>
                </div>

                {showSocialLinks && (
                  <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Website</label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Twitter / X</label>
                      <input
                        type="text"
                        placeholder="https://x.com/..."
                        value={formData.twitter}
                        onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                        className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Telegram</label>
                      <input
                        type="text"
                        placeholder="https://t.me/..."
                        value={formData.telegram}
                        onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                        className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">Discord</label>
                      <input
                        type="text"
                        placeholder="https://discord.gg/..."
                        value={formData.discord}
                        onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                        className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Revoke Authorities Cards */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary">Revoke Authorities</h3>
              <p className="text-xs text-muted-foreground mb-4">Select which authorities you want to revoke for your token</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Revoke Freeze */}
                <div 
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group",
                    formData.revokeFreeze 
                      ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(139,92,246,0.2)]" 
                      : "bg-secondary/20 border-border hover:border-primary/50"
                  )}
                  onClick={() => setFormData(prev => ({ ...prev, revokeFreeze: !prev.revokeFreeze }))}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">Revoke Freeze</h4>
                      <span className="text-[10px] text-green-400 font-mono">+10,000 AICP</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Permanently revokes the ability to freeze token accounts, increasing investor confidence.
                    </p>
                    <div className={cn(
                      "mt-3 text-xs font-medium py-1.5 px-3 rounded-md text-center transition-colors",
                      formData.revokeFreeze ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                    )}>
                      {formData.revokeFreeze ? "Selected" : "Select"}
                    </div>
                  </div>
                </div>

                {/* Revoke Mint */}
                <div 
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group",
                    formData.revokeMint
                      ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(139,92,246,0.2)]" 
                      : "bg-secondary/20 border-border hover:border-primary/50"
                  )}
                  onClick={() => setFormData(prev => ({ ...prev, revokeMint: !prev.revokeMint }))}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">Revoke Mint</h4>
                      <span className="text-[10px] text-green-400 font-mono">+10,000 AICP</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Prevents future token minting, establishing a fixed supply that investors can trust.
                    </p>
                    <div className={cn(
                      "mt-3 text-xs font-medium py-1.5 px-3 rounded-md text-center transition-colors",
                      formData.revokeMint ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                    )}>
                      {formData.revokeMint ? "Selected" : "Select"}
                    </div>
                  </div>
                </div>

                {/* Revoke Update */}
                <div 
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden group",
                    formData.revokeUpdate
                      ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(139,92,246,0.2)]" 
                      : "bg-secondary/20 border-border hover:border-primary/50"
                  )}
                  onClick={() => setFormData(prev => ({ ...prev, revokeUpdate: !prev.revokeUpdate }))}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">Revoke Update</h4>
                      <span className="text-[10px] text-green-400 font-mono">+10,000 AICP</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Locks token metadata permanently, ensuring immutability of project characteristics.
                    </p>
                    <div className={cn(
                      "mt-3 text-xs font-medium py-1.5 px-3 rounded-md text-center transition-colors",
                      formData.revokeUpdate ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
                    )}>
                      {formData.revokeUpdate ? "Selected" : "Select"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Summary */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-green-400">Final Token Summary</h3>
              <div className="bg-secondary/30 p-4 rounded-xl border border-border/50 space-y-4">
                {/* Header with Image */}
                <div className="flex items-center gap-4 pb-4 border-b border-border/50">
                  <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden border border-border">
                    {formData.previewUrl ? (
                      <img src={formData.previewUrl} alt="Token" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Img</div>
                    )}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Name</div>
                      <div className="font-medium text-sm">{formData.name || '---'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Symbol</div>
                      <div className="font-medium text-sm">{formData.symbol || '---'}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                   <div>
                      <div className="text-muted-foreground">Supply</div>
                      <div className="font-medium">{formData.supply ? Number(formData.supply).toLocaleString() : '0'}</div>
                   </div>
                   <div>
                      <div className="text-muted-foreground">Decimals</div>
                      <div className="font-medium">{formData.decimals}</div>
                   </div>
                </div>

                <div className="space-y-1">
                   <div className="text-xs text-muted-foreground">Selected Authorities</div>
                   <div className="flex gap-2 flex-wrap">
                      {formData.revokeFreeze && <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">Revoke Freeze</span>}
                      {formData.revokeMint && <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">Revoke Mint</span>}
                      {formData.revokeUpdate && <span className="text-[10px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20">Revoke Update</span>}
                      {!formData.revokeFreeze && !formData.revokeMint && !formData.revokeUpdate && <span className="text-[10px] text-muted-foreground italic">None selected</span>}
                   </div>
                </div>

                <div className="space-y-1">
                   <div className="text-xs text-muted-foreground">Creator Information</div>
                   <div className="text-sm font-medium">AiCyberProphet</div>
                   <div className="flex flex-col gap-0.5">
                     <a href="https://aicyberprophet.fun" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                       https://aicyberprophet.fun
                     </a>
                     <a href="https://x.com/AiCyberProphet" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                       https://x.com/AiCyberProphet
                     </a>
                   </div>
                </div>

                {/* Cost Breakdown */}
                <div className="pt-3 border-t border-border/50 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Base Fee:</span>
                    <span>20,000 AICP</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Service Gas Fee:</span>
                    <span>0.1 SOL</span>
                  </div>
                  {(formData.revokeFreeze || formData.revokeMint || formData.revokeUpdate || showCreatorInfo) && (
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Authority & Info Fees:</span>
                      <span>+{(
                        (formData.revokeFreeze ? 10000 : 0) + 
                        (formData.revokeMint ? 10000 : 0) + 
                        (formData.revokeUpdate ? 10000 : 0) +
                        (showCreatorInfo ? 10000 : 0)
                      ).toLocaleString()} AICP</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-border/50 text-green-400">
                    <span>Total Cost:</span>
                    <span>{(
                      20000 + 
                      (formData.revokeFreeze ? 10000 : 0) + 
                      (formData.revokeMint ? 10000 : 0) + 
                      (formData.revokeUpdate ? 10000 : 0) +
                      (showCreatorInfo ? 10000 : 0)
                    ).toLocaleString()} AICP + 0.1 SOL</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
                <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground font-semibold rounded-lg transition-all"
                >
                Back
                </button>
                <button
                onClick={handleCreateToken}
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg shadow-green-500/20 transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Token 🚀
                  </>
                )}
                </button>
            </div>
            </div>
        )}
      </div>
    </div>
  );
};
