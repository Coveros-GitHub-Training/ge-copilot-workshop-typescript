'use client';

import { useState } from 'react';
import { Heart, Eye, Download, TrendingUp, Trophy, Medal, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { Hero, SectionContainer, SectionTitle } from '@/components/ui';
import { mockPhotos, Photo } from '@/lib/mock-photo-data';

type SortMetric = 'likes' | 'views' | 'downloads';

const METRICS: { key: SortMetric; label: string; icon: React.ElementType; color: string }[] = [
  { key: 'likes', label: 'Most Liked', icon: Heart, color: 'text-rose-500' },
  { key: 'views', label: 'Most Viewed', icon: Eye, color: 'text-blue-500' },
  { key: 'downloads', label: 'Most Downloaded', icon: Download, color: 'text-green-500' },
];

const PODIUM_ICONS = [Trophy, Medal, Award];
const PODIUM_COLORS = [
  'from-yellow-400 to-amber-500',
  'from-slate-300 to-slate-400',
  'from-orange-400 to-amber-600',
];
const PODIUM_LABELS = ['1st', '2nd', '3rd'];
const GRADIENT_CLASSES = [
  'from-blue-400 to-blue-600',
  'from-green-400 to-green-600',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-pink-600',
  'from-yellow-400 to-yellow-600',
  'from-red-400 to-red-600',
];

function getPhotoGradient(photo: Photo) {
  const idx = parseInt(photo.id, 10) % GRADIENT_CLASSES.length;
  return GRADIENT_CLASSES[idx];
}

function MetricValue({ metric, photo }: { metric: SortMetric; photo: Photo }) {
  const MetricIcon = METRICS.find(m => m.key === metric)!.icon;
  const color = METRICS.find(m => m.key === metric)!.color;
  return (
    <span className={`flex items-center gap-1 font-semibold ${color}`}>
      <MetricIcon className="h-4 w-4" />
      {photo[metric].toLocaleString()}
    </span>
  );
}

export default function TrendingPage() {
  const [activeMetric, setActiveMetric] = useState<SortMetric>('likes');

  const sorted = [...mockPhotos].sort((a, b) => b[activeMetric] - a[activeMetric]);
  const podium = sorted.slice(0, 3);
  const rest = sorted.slice(3);

  return (
    <div className="page-gradient">
      <Hero
        title="Trending Photos"
        description="Discover the most popular photos ranked by likes, views, and downloads."
      />

      {/* Metric Tabs */}
      <SectionContainer className="mb-0 pb-0">
        <div className="flex justify-center gap-3 flex-wrap">
          {METRICS.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => setActiveMetric(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 border ${
                activeMetric === key
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-blue-400'
              }`}
            >
              <Icon className={`h-4 w-4 ${activeMetric === key ? 'text-white' : color}`} />
              {label}
            </button>
          ))}
        </div>
      </SectionContainer>

      {/* Podium — Top 3 */}
      <SectionContainer>
        <SectionTitle title="Top 3" />
        {/* Classic podium order: 2nd | 1st | 3rd */}
        <div className="flex flex-col md:flex-row justify-center items-end gap-6 mt-4">
          {([1, 0, 2] as const).map((rank) => {
            const photo = podium[rank];
            if (!photo) return null;
            const PodiumIcon = PODIUM_ICONS[rank];
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rank * 0.1 }}
                className={`flex flex-col items-center card-elevated overflow-hidden w-full md:w-72 ${
                  rank === 0 ? 'md:scale-105 ring-2 ring-amber-400' : ''
                }`}
              >
                {/* Rank banner */}
                <div className={`w-full py-2 flex items-center justify-center gap-2 bg-gradient-to-r ${PODIUM_COLORS[rank]} text-white font-bold text-sm`}>
                  <PodiumIcon className="h-4 w-4" />
                  {PODIUM_LABELS[rank]} Place
                </div>

                {/* Color swatch (placeholder image) */}
                <div className={`w-full aspect-[4/3] bg-gradient-to-br ${getPhotoGradient(photo)}`} />

                <div className="p-4 w-full">
                  <h3 className="font-semibold text-slate-900 dark:text-white truncate mb-1">
                    {photo.title}
                  </h3>
                  {photo.photographer && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      by {photo.photographer}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mt-2">
                    <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" />{photo.likes}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{photo.views}</span>
                    <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5" />{photo.downloads}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <MetricValue metric={activeMetric} photo={photo} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>

      {/* Full Leaderboard */}
      <SectionContainer bgColor="bg-white/30 dark:bg-slate-800/30">
        <SectionTitle title="Full Rankings" />
        <div className="space-y-3 mt-4">
          {rest.map((photo, idx) => {
            const rank = idx + 4;
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="card-base p-4 flex items-center gap-4"
              >
                {/* Rank number */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 font-bold text-slate-600 dark:text-slate-300 flex-shrink-0">
                  {rank}
                </div>

                {/* Color swatch */}
                <div className={`w-16 h-12 rounded-lg bg-gradient-to-br ${getPhotoGradient(photo)} flex-shrink-0`} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 dark:text-white truncate">{photo.title}</p>
                  {photo.photographer && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">by {photo.photographer}</p>
                  )}
                </div>

                {/* Metric highlight */}
                <MetricValue metric={activeMetric} photo={photo} />

                {/* Secondary stats */}
                <div className="hidden sm:flex items-center gap-3 text-sm text-slate-400 dark:text-slate-500">
                  <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" />{photo.likes}</span>
                  <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{photo.views}</span>
                  <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5" />{photo.downloads}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionContainer>

      {/* Footer CTA */}
      <SectionContainer className="text-center">
        <div className="flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 mb-3">
          <TrendingUp className="h-5 w-5" />
          <span className="text-sm">Rankings update in real time as photos receive new likes, views, and downloads.</span>
        </div>
      </SectionContainer>
    </div>
  );
}
