export function getData() {
  let a = '一个人举起左臂，左手朝脸边放东西。\n' +
      '一个人缓慢地直行。\n' +
      '一个人大幅度地上下移动手臂，然后前后移动\n' +
      '一个人慢慢后退\n' +
      '一个人用一只脚保持平衡，同时移动另一只脚，然后换脚。\n' +
      '一个男人正在打网球。\n' +
      '一个人双手举起，向一侧移动，向前弯曲并触碰他的脚。\n' +
      '双臂高举在空中跳舞。\n' +
      '一个人向前走，跌跌撞撞，然后继续向前走。\n' +
      '一个人斜着向后走\n' +
      '一个人向前走，又停下来。\n' +
      '一个人坐下来用手说话。\n' +
      '用手擦拭东西\n' +
      '一个人将右臂向外移动，而另一只手臂靠近臀部。然后，用双手做出铲动动作。\n' +
      '双臂伸向两侧，一个人向前走\n' +
      '一个人将右手举到脸上。\n' +
      '一个人在快速做开合跳。\n' +
      '这个人正在做开合跳。\n' +
      '一个男人举起双手，从右到左移动试图找到什么东西，然后放下。\n' +
      '一个人向前伸出右臂\n' +
      '人站着并伸展他们的三头肌\n' +
      '这个人正在将一些东西放入搅拌碗中。\n' +
      '一个人跳跃时，双腿分开，手臂向外摆动至头顶上方，然后再次落下。\n' +
      '一个人用双臂做手势。\n' +
      '一个人从3点钟位置顺时针走到11点钟位置。\n' +
      '一个人一边跳舞一边旋转。\n' +
      '一个人沿着顺时针方向走一圈，然后在开始的地方停下来。\n' +
      '一个人下降到地面并用四肢行走。\n' +
      '一个人斜着向前跑，然后旋转九十度并跑\n' +
      '一个人在行走时爬上一个台阶。\n' +
      '有人用双臂比划着这些韵律，我是一个小茶壶，“把我抱起来，把我倒出来”\n' +
      '一个人在两脚之间跳跃时将右腿踢两次，然后猛击右臂\n' +
      '一个人逆时针向后移动，同时用其壮举画一条线\n' +
      '一个人向前冲刺，然后四肢着地继续向前，然后站起来。\n' +
      '一个人弯下腰环顾四周。\n' +
      '一个人用右手挥手。\n' +
      '一个人逆时针走一圈。\n' +
      '转弯时从左向右运行并沿途增加速度。\n' +
      '一个人用左腿站立，将右腿向侧面、向后摆动，然后回到双腿站立的位置。\n' +
      '一个人缓慢地向前迈出稍微对角的一步\n' +
      '一个人向右转，从两侧向右走，然后向左走。\n' +
      '处于防御姿势的人先向右倾斜，然后向左倾斜。\n' +
      '一个人缓慢地向前走。\n' +
      '一个人向前走，然后转身走回来。\n' +
      '一名男子重新摆放架子上的物品，然后退后一步。\n' +
      '一个人跳跃\n' +
      '一个人正在用右手挥手。\n' +
      '有人右脚后退，然后坐下，双手放在膝盖上，肘部向外。\n' +
      '有人在跳舞，他们先拍手，然后左右移动手臂，同时前后移动脚\n' +
      '人站在t位置，双手交叉，然后返回t位置\n' +
      "一个人向前走去，弯下腰，痛苦地抓住自己的左膝。 他试图直起身子向前走，然后弯下腰再次抓住膝盖。 然后他向后向左侧走去。\n" +
      "一个人举起双臂挥手。\n" +
      "有人在沙子上划线\n" +
      "一个人在空中跳跃，旋转一整圈，向前走，然后向后走。\n" +
      "一个人跪下，然后用右手将自己推起来\n" +
      "一个人从双臂张开呈 T 字形，到趴在身体一侧。\n" +
      "双手双脚向侧面跳出并向后跳数次。\n" +
      "一个人将右臂按顺时针方向转动几次。 他的手掌朝下，好像在搅拌什么东西。\n" +
      "一个人后退并举起双臂面对自卫。\n" +
      "站着的人从头顶向前扔东西，然后再用更大的力从头顶向前扔东西，使右脚向前迈出一步。\n" +
      "一个人站着，表现得像只鸡。\n" +
      "一个男人向右走去。\n" +
      "一个人向前走，转身，然后向后走。\n" +
      "一个人打空手道踢腿。\n" +
      "一个人逆时针走一圈，然后坐下。\n" +
      "一个人把手放在臀部\n" +
      "一个人走上楼梯\n" +
      "一个人将右手放在胸前，稍微移动一下，然后将手举到头上。\n" +
      "一个人站着，看起来像是将一个哑铃举过头顶。 他的双臂上下移动。\n" +
      "一个人来回跑\n" +
      "一个人在地上从东向西爬行然后又返回\n" +
      "一个人向前走，用右手去够东西，然后向后走，再向前走，到达同一个地方，然后再向后走。\n" +
      "一个人向前走并捡起东西\n" +
      "一个人缓缓前行。\n" +
      "一个人慢慢地向右走，然后向左走，最后停在中间\n" +
      "左手放在臀部，右手在走动时来回摆动。\n" +
      "一个人向前走，用右手拿起某样东西，然后把它放在左边。\n" +
      "一个人向前弯腰，用右手拍打地上的东西。\n" +
      "一个人将双手举至两侧，与头齐平，蹲到几乎地板上，然后站起来，再次蹲下，直到大腿与地板平行，然后迅速站起来，再蹲到几乎地板上，然后站起来。\n" +
      "一个人沿左对角线行走，然后停下来，双手轻轻举起。\n" +
      "他向前走，然后快速转身，向后走\n" +
      "一个人正在做开合跳\n" +
      "男子原地跳了两次\n" +
      "男人后退了四步。\n" +
      "一个男人挥动高尔夫球杆并击球\n" +
      "一个人跳绳。\n" +
      "有人走上一段楼梯。\n" +
      "一个人似乎正在用右手击球。\n" +
      "一个人转身，向后走，然后转身，向后走\n" +
      "一个人物以弯曲的姿势向后猛冲。\n" +
      "这个人正在毫无热情地打网球\n" +
      "一个人正在跳杂技舞蹈。\n" +
      "一个人慢慢地向前走\n" +
      "一个人在原地做开合跳。\n" +
      "这个人正在用右手挥手。\n" +
      "一个人上前拿起并放置一个物品。\n" +
      "一个人举起手臂两次做二头肌弯举\n" +
      "一个人向上伸展右臂，然后向上伸展左臂。\n" +
      "一个人向前走，同时伸出双臂保持平衡\n" +
      "一个人向前走几步，然后慢跑几步，双臂放松在身体两侧。\n" +
      "一个没有头的人摇晃着手臂沿着一个矩形方块行走。\n" +
      "人物似乎正在举起一张纸并阅读它\n" +
      "那人正在移动他的手臂\n" +
      "人向前伸出手，将手里拿着东西的手向后拉。 向右转，像打开外套一样张开双臂，然后恢复原来的姿势\n" +
      "一个人举起右臂，然后放下。\n" +
      "一个人利用颈部的运动范围以顺时针方向移动头部\n" +
      "一个人摇摇晃晃地向前走。\n" +
      "人从一边伸展到另一边\n" +
      "一个人走来走去，然后蹲下，双臂向前\n" +
      "一个人向前走，然后走上一些台阶。\n" +
      "一个人在伸展/放松手臂的同时自信地沿着过道行走。\n" +
      "一个人影似乎在缓慢而愉快地鼓掌\n" +
      "那个正在做风车旋转的人。\n" +
      "一个人的腰部向右弯曲。\n" +
      "一个人从躺着站起来，按顺时针方向走一圈，然后再躺下。\n" +
      "这个人正在跳华尔兹。\n" +
      "正如标题所示，这个人正在向后直走。\n" +
      "一个人快速左右移动\n" +
      "一个人向前走得很慢。\n" +
      "一个人用右臂做投掷动作\n" +
      "他双手放在身体两侧，小心翼翼地向前走，动作很少。\n" +
      "该男子步行并右转\n" +
      "一个人把东西扔到右边； 首先是低手的东西，然后是高手的东西，然后是非常远的东西。\n" +
      "一个人将右臂举起然后放下。\n" +
      "一个人短暂地弹奏吉他。\n" +
      "男人朝相反的方向走，然后转身。\n" +
      "一个人快速向前跑去，然后弯下腰，双手捡起一个东西。\n" +
      "一个人将右手从身体前方开始，用另一只手沿逆时针方向向身体右侧移动，当手臂回到圆圈前方时，左手会与左手相遇 手。 这种情况再次发生，就好像这个人用右手扔球一样\n" +
      "一个人慢慢地向前走，然后停了下来。\n" +
      "一个人向前迈四步，同时向右转，最终面朝右侧。\n" +
      "人在原地跳跃，双臂放在身体两侧\n" +
      "将手举向头部。\n" +
      "双腿分开向前走。\n" +
      "站立的人用左脚和右脚原地慢跑\n" +
      "左右摇动双腿。\n" +
      "有人用双手举起某物，将其从右侧倒出，然后将其放回原处。\n" +
      "一个人笔直地向前走。\n" +
      "模拟市民似乎用右手固定左手，然后检查手表。\n" +
      "一个人举起右手，然后又放下。\n" +
      "人们正在练习网球技术\n" +
      "一个男人坐下来，用左手拿起一个物体。\n" +
      "人类仅使用左腿向前移动，以一定角度前后移动\n" +
      "一个人双手举起，向一侧移动，向前弯曲并触碰他的脚。\n" +
      "这人走得很悠闲。\n" +
      "一个人假装是一只恐龙\n" +
      "人们举起双手，脖子的高度并拍手\n" +
      "一个人前后移动，然后向后移动。\n" +
      "该人扶着栏杆爬楼梯\n" +
      "一个人屈膝站立，双手放在大腿上，双臂向上，举起右臂，左臂下降，放下右臂，然后再次将双臂从身体两侧抬起。\n" +
      "有人转身靠在墙上，然后沿直线向前然后向后移动。"

  let b = a.split(/\n/);
  let textObj = {};
  for (let i = 0; i < 150; i++) {
    let val;
    if (i < 10){
      val = '0' + i;

    }else {
      val = ''+i;
    }
    textObj[val] = b[i]
  }
  return textObj
}
