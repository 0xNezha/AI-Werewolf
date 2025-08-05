# AI狼人杀启动脚本

## 📁 文件说明

- `start-players.sh` - Linux/Mac生产模式启动脚本
- `start-players.bat` - Windows生产模式启动脚本  
- `dev-players.sh` - Linux/Mac开发模式启动脚本

## 🚀 使用方法

### 方法1: 使用npm脚本 (推荐)

```bash
# 开发模式启动所有6个AI玩家
pnpm dev:all-players

# 生产模式启动所有6个AI玩家 (需先构建)
pnpm build
pnpm start:all-players

# 同时启动游戏主进程和所有AI玩家
pnpm dev:game
```

### 方法2: 直接运行脚本

```bash
# Linux/Mac - 开发模式
./scripts/dev-players.sh

# Linux/Mac - 生产模式  
./scripts/start-players.sh

# Windows - 生产模式
scripts\start-players.bat
```

## 🎮 AI玩家配置

每个AI玩家都有独特的个性和配置：

| 端口 | 玩家名称 | 个性特点 | 策略 | 说话风格 | AI模型 |
|------|----------|----------|------|----------|--------|
| 3001 | 智能分析师 | 理性分析型，善于逻辑推理 | balanced | casual | claude-3-haiku |
| 3002 | 狼王 | 激进型，敢于质疑攻击 | aggressive | formal | gpt-4 |
| 3003 | 守护者 | 保守稳重，观察思考 | conservative | formal | claude-3.5-sonnet |
| 3004 | 幽默大师 | 风趣幽默，善于化解紧张 | balanced | witty | gpt-3.5-turbo |
| 3005 | 侦探 | 逻辑推理强，专注事实分析 | balanced | formal | claude-3-haiku |
| 3006 | 新手村民 | 新手型，容易被误导 | conservative | casual | gpt-3.5-turbo |

## 📋 状态监控

启动后可以通过以下地址查看各AI玩家状态：

- 智能分析师: http://localhost:3001/api/player/status
- 狼王: http://localhost:3002/api/player/status
- 守护者: http://localhost:3003/api/player/status
- 幽默大师: http://localhost:3004/api/player/status
- 侦探: http://localhost:3005/api/player/status
- 新手村民: http://localhost:3006/api/player/status

## 📝 日志文件

所有日志文件保存在 `logs/` 目录下：

- `player1.log` - 智能分析师日志
- `player2.log` - 狼王日志
- `player3.log` - 守护者日志
- `player4.log` - 幽默大师日志
- `player5.log` - 侦探日志
- `player6.log` - 新手村民日志

开发模式日志文件后缀为 `-dev.log`

## 🛑 停止AI玩家

### Linux/Mac
按 `Ctrl+C` 停止脚本，会自动清理所有启动的进程

### Windows
关闭命令行窗口，或手动关闭各个AI玩家的cmd窗口

## ⚙️ 配置文件

所有配置文件位于 `config/` 目录：

- `player1.json` - 智能分析师配置
- `player2.json` - 狼王配置
- `player3.json` - 守护者配置
- `player4.json` - 幽默大师配置
- `player5.json` - 侦探配置
- `player6.json` - 新手村民配置

你可以修改这些配置文件来调整AI玩家的行为特点。

## 🔧 故障排除

### 端口被占用
如果某个端口被占用，修改对应的配置文件中的端口号。

### AI API失败
- 检查环境变量中的API密钥设置
- AI服务会自动降级到预设回复，不影响游戏进行

### 进程启动失败
- 查看对应的日志文件获取详细错误信息
- 确保已正确安装依赖：`pnpm install`
- 生产模式需要先构建：`pnpm build`

## 🎯 测试示例

启动后可以测试AI玩家的发言功能：

```bash
# 测试智能分析师发言
curl -X POST http://localhost:3001/api/player/speak \
  -H "Content-Type: application/json" \
  -d '{
    "otherSpeeches": ["player2: 我觉得player3很可疑"],
    "allSpeeches": ["player1: 大家好", "player2: 我觉得player3很可疑"]
  }'
```

每个AI玩家会根据自己的个性特点生成不同风格的回应。