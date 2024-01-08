import { useEffect, useState } from "react";

const UnionTable =({info}) => {
  const [posInfo, setPosInfo] = useState([]);
  const arr = Array.from({length: 20},(_,i)=>Array.from({length: 22},(_,j)=>i*22+j))
  useEffect(()=>{
    if(info.union_block){
      
      const flatted = info.union_block.map(block=>{ 
        return block.block_position.map(pos => {
            return {x: pos.x, y: pos.y, block_class: block.block_class}
          })
      }).flat();

      const sorted = flatted.sort((a,b)=>{
        if(a.x > b.x) return 1;
        else if(a.x < b.x) return -1;
        else return a.y - b.y;
      })
      // console.log(sorted)
      setPosInfo(sorted);
    }
  }, [info])
  
  const isActive = (cx, cy) => {
    for(const {x, y, block_class} of posInfo){
      if(x===cy-11 && y===cx-9){ 
        if(block_class==='제논'){console.log(x, y, block_class, cx, cy)}
        switch(block_class){
          case '히어로':case '팔라딘':case '다크나이트':case '소울마스터':case '미하일':case '블래스터':case '데몬슬레이어':case '데몬어벤져':case '아란':case '카이저':case '아델':case '제로':
            return 'active-cell active-warrior-cell';
          case '보우마스터':case '신궁':case '패스파인더':case '윈드브레이커':case '와일드헌터':case '메르세데스':case '카인':
            return 'active-cell active-archer-cell';
          case '아크메이지(불,독)':case '아크메이지(썬,콜)':case '비숍':case '플레임위저드':case '배틀메이지':case '에반':case '루미너스':case '일리움':case '라라':case '키네시스':
            return 'active-cell active-wizard-cell';
          case '나이트로드':case '섀도어':case '듀얼블레이더':case '나이트워커':case '팬텀':case '카데나':case '칼리':case '호영':
            return 'active-cell active-thief-cell';
          case '바이퍼':case '캡틴':case '캐논마스터':case '스트라이커':case '메카닉':case '은월':case '엔젤릭버스터':case '아크':
            return 'active-cell active-pirate-cell';
            case '제논':
              return 'active-cell active-hybrid-cell';
              default: 
              console.log(block_class)
            return 'active-cell';
        }
      }
    }
    return '';
  }
  return (
    <div className="union-table">
      {
        arr.map((row, rIdx)=>
          <div className="row" key={rIdx}>
          {row.map((cell, cIdx) => 
            <div className={`cell ${isActive(rIdx, cIdx)}`} key={cIdx}></div>
            )}
          </div> 
          )
      }
    </div>
  ) 
}

export default UnionTable;