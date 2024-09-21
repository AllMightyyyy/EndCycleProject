'use client';

import React from 'react';
import { Card, CardContent, Typography, useTheme, Box } from '@mui/material';
import { WbSunny } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface LDRWidgetProps {
  ldr: number;
}

const LDRWidget: React.FC<LDRWidgetProps> = ({ ldr }) => {
  const theme = useTheme();

  const getBackgroundColor = (ldr: number) => {
    if (ldr < 100) return 'linear-gradient(135deg, #f7f8fa 0%, #d7d8da 100%)'; 
    if (ldr >= 100 && ldr <= 500) return 'linear-gradient(135deg, #fffacd 0%, #ffeb3b 100%)'; 
    return 'linear-gradient(135deg, #fff176 0%, #ffc107 100%)'; 
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        sx={{
          background: getBackgroundColor(ldr),
          color: theme.palette.primary.contrastText,
          borderRadius: '20px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          padding: 2,
        }}
      >
        <CardContent>
          {/* Icon with animated light intensity reading */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              padding: '20px 0',
            }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <WbSunny fontSize="large" sx={{ fontSize: '4rem' }} />
            </motion.div>

            <Typography
              variant="h3"
              align="center"
              sx={{
                fontWeight: 700,
                fontSize: '3rem',
                marginTop: '10px',
              }}
            >
              {ldr} lux
            </Typography>

            <Typography
              variant="subtitle1"
              align="center"
              sx={{
                fontWeight: 500,
                marginTop: '10px',
                letterSpacing: '1px',
              }}
            >
              Light Intensity
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LDRWidget;
