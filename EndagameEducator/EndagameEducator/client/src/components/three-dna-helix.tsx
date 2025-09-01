import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dna, RotateCcw, ZoomIn, ZoomOut, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThreeDNAHelixProps {
  expressionLevel: number;
  promoterType: 'weak' | 'strong';
  hasReporter: boolean;
  isMutationFixed: boolean;
}

export function ThreeDNAHelix({ 
  expressionLevel, 
  promoterType, 
  hasReporter, 
  isMutationFixed 
}: ThreeDNAHelixProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!isRotating) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, [isRotating]);

  const helixColor = promoterType === 'strong' ? '#3b82f6' : '#6b7280';
  const expressionColor = `rgba(34, 197, 94, ${expressionLevel / 100})`;

  return (
    <div className="w-full h-full flex flex-col">
      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            <Dna className="w-3 h-3 mr-1" />
            3D View
          </Badge>
          {hasReporter && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Eye className="w-3 h-3 mr-1" />
              GFP Reporter
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setZoom(prev => Math.max(0.5, prev - 0.1))}
            data-testid="button-zoom-out"
          >
            <ZoomOut className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setZoom(prev => Math.min(2, prev + 0.1))}
            data-testid="button-zoom-in"
          >
            <ZoomIn className="w-3 h-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsRotating(!isRotating)}
            data-testid="button-toggle-rotation"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* 3D Visualization Container */}
      <div 
        ref={canvasRef}
        className="flex-1 relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-border overflow-hidden gene-editor-canvas"
        data-testid="dna-helix-canvas"
      >
        {/* Dna Helix Visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="relative"
            style={{ 
              transform: `rotate(${rotation}deg) scale(${zoom})`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Double Helix Structure */}
            <svg width="200" height="300" viewBox="0 0 200 300" className="drop-shadow-lg">
              {/* Dna Backbone */}
              <defs>
                <linearGradient id="helixGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={helixColor} />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Left Strand */}
              <path
                d="M 50 20 Q 30 60 50 100 Q 70 140 50 180 Q 30 220 50 260"
                stroke="url(#helixGradient)"
                strokeWidth="8"
                fill="none"
                filter="url(#glow)"
              />
              
              {/* Right Strand */}
              <path
                d="M 150 20 Q 170 60 150 100 Q 130 140 150 180 Q 170 220 150 260"
                stroke="url(#helixGradient)"
                strokeWidth="8"
                fill="none"
                filter="url(#glow)"
              />

              {/* Base Pairs */}
              {Array.from({ length: 8 }).map((_, i) => {
                const y = 40 + i * 30;
                const offset = Math.sin((rotation + i * 45) * Math.PI / 180) * 20;
                
                return (
                  <g key={i}>
                    <line
                      x1={70 + offset}
                      y1={y}
                      x2={130 - offset}
                      y2={y}
                      stroke={isMutationFixed || i !== 3 ? "#10b981" : "#ef4444"}
                      strokeWidth="3"
                      opacity="0.8"
                    />
                    {/* Base pair indicators */}
                    <circle cx={70 + offset} cy={y} r="4" fill="#3b82f6" />
                    <circle cx={130 - offset} cy={y} r="4" fill="#ef4444" />
                  </g>
                );
              })}

              {/* Promoter Region Indicator */}
              <rect
                x="40"
                y="10"
                width="120"
                height="20"
                fill={promoterType === 'strong' ? "#22c55e" : "#6b7280"}
                opacity="0.3"
                rx="10"
              />
              <text x="100" y="22" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
                {promoterType.toUpperCase()} PROMOTER
              </text>

              {/* Expression Level Visualization */}
              <g opacity={expressionLevel / 100}>
                <circle cx="100" cy="150" r="40" fill={expressionColor} opacity="0.3" />
                <circle cx="100" cy="150" r="30" fill={expressionColor} opacity="0.5" />
                <circle cx="100" cy="150" r="20" fill={expressionColor} opacity="0.7" />
              </g>

              {/* GFP Reporter Visualization */}
              {hasReporter && (
                <g>
                  <circle cx="100" cy="280" r="15" fill="#22c55e" opacity="0.8" className="animate-pulse" />
                  <text x="100" y="285" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">
                    GFP
                  </text>
                </g>
              )}

              {/* Mutation Indicator */}
              {!isMutationFixed && (
                <g>
                  <circle cx="130" cy="130" r="8" fill="#ef4444" opacity="0.8" />
                  <text x="130" y="135" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
                    !
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Information Overlay */}
        <div className="absolute top-4 left-4 space-y-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 space-y-1">
            <div className="text-xs font-medium text-foreground">
              Promoter: <span className={promoterType === 'strong' ? 'text-green-600' : 'text-gray-600'}>
                {promoterType}
              </span>
            </div>
            <div className="text-xs font-medium text-foreground">
              Expression: <span className="text-green-600">{expressionLevel}%</span>
            </div>
            {hasReporter && (
              <div className="text-xs font-medium text-green-600">
                ✓ GFP Reporter Active
              </div>
            )}
            {isMutationFixed && (
              <div className="text-xs font-medium text-green-600">
                ✓ Mutation Corrected
              </div>
            )}
            {!isMutationFixed && (
              <div className="text-xs font-medium text-red-600">
                ⚠ Mutation Detected
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
            <div className="text-xs font-medium text-foreground mb-2">Legend</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Adenine (A)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Thymine (T)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Expression Glow</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conceptual Disclaimer */}
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Educational Model
          </Badge>
        </div>
      </div>
    </div>
  );
}
