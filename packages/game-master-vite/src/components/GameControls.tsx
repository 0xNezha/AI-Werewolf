'use client';

import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { GamePhase } from '@ai-werewolf/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { gameMaster } from '@/stores/gameStore';
import { getPlayerUrls } from '@/lib/playerConfig';

export const GameControls = observer(function GameControls() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateGame = async () => {
    setIsLoading(true);
    try {
      // 获取玩家URL列表
      const playerUrls = getPlayerUrls();
      
      // 创建游戏
      await gameMaster.createGame(playerUrls.length);
      
      // 添加AI玩家，ID从1开始
      for (let i = 0; i < playerUrls.length; i++) {
        await gameMaster.addPlayer(i + 1, playerUrls[i]);
      }
      
      // 分配角色
      await gameMaster.assignRoles();
      
      console.log(`✅ Game created successfully with ID: ${gameMaster.gameId}`);
      console.log(`👥 Added ${playerUrls.length} players`);
    } catch (err) {
      console.error('Failed to create game:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartGame = async () => {
    setIsLoading(true);
    try {
      await gameMaster.startGame();
    } catch (err) {
      console.error('Failed to start game:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPhase = async () => {
    setIsLoading(true);
    try {
      await gameMaster.nextPhase();
    } catch (err) {
      console.error('Failed to advance phase:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndGame = () => {
    // Reset game state if needed
    console.log('End game requested');
  };

  const gameState = gameMaster.getGameState();
  const canStart = gameMaster.gameId && gameState && gameState.players.length > 0 && gameState.round === 0;
  const canAdvance = gameMaster.gameId && gameState && gameState.round > 0 && gameState.currentPhase !== GamePhase.ENDED;
  const canEnd = gameMaster.gameId !== null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎮 游戏控制
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <Button
            onClick={handleCreateGame}
            disabled={isLoading || (gameMaster.gameId !== null && gameMaster.players.length > 0)}
            variant="default"
            size="sm"
          >
            {isLoading && !gameMaster.gameId ? '创建中...' : '创建新游戏'}
          </Button>

          <Button
            onClick={handleStartGame}
            disabled={isLoading || !canStart}
            variant="default"
            size="sm"
          >
            {isLoading && canStart ? '开始中...' : '开始游戏'}
          </Button>

          <Button
            onClick={handleNextPhase}
            disabled={isLoading || !canAdvance}
            variant="secondary"
            size="sm"
          >
            {isLoading && canAdvance ? '切换中...' : '下一阶段'}
          </Button>

          <Button
            onClick={handleEndGame}
            disabled={isLoading || !canEnd}
            variant="destructive"
            size="sm"
          >
            结束游戏
          </Button>

          {gameMaster.gameId && (
            <div className="ml-auto flex items-center space-x-2">
              <span className="text-muted-foreground">游戏ID:</span>
              <Badge variant="outline" className="font-mono text-xs">
                {gameMaster.gameId}
              </Badge>
            </div>
          )}
        </div>

        {gameState && (
          <div className="border rounded-lg p-3">
            <div className="text-sm flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">第{gameState.round}天</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">阶段:</span>
                <Badge variant="secondary" className="text-xs">
                  {getPhaseText(gameState.currentPhase)}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

function getPhaseText(phase: GamePhase): string {
  const phaseMap = {
    [GamePhase.PREPARING]: '准备中',
    [GamePhase.NIGHT]: '夜晚',
    [GamePhase.DAY]: '白天',
    [GamePhase.VOTING]: '投票',
    [GamePhase.ENDED]: '结束'
  };
  return phaseMap[phase] || phase;
}