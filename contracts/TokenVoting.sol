pragma solidity >=0.4.21 <0.8.20;

// token 就是当前系统的代币，拿以太来购买
contract TokenVoting {
    // 投票人结构
    struct voter{
        // 地址                
        address voterAddress;
        // 持有剩余数量
        uint256 tokenNumber;
        // 投票给的候选人
        uint256[] tokenForCandidateList;
    }
    // 发行的总token
    uint256 public tokenTotal;
    // 发行的剩余token
    uint256 public tokenBalance;
    // 发行的单价
    uint256 public tokenPrice;
    // 候选人
    bytes2[]   candidateList;
    // 候选人和对应的票数
    mapping(bytes2=>uint256) public receivedNumber;
    // 后选人地址对应候选人映射
    mapping(address=>voter) public voterMap;

    event voterDetail(bytes2, uint256);

    constructor(uint256 _tokenTotal ,uint256 _tokenPrice ,bytes2[] memory candidateName ) public {
        tokenTotal = _tokenTotal;
        tokenBalance = _tokenTotal;
        tokenPrice=_tokenPrice;
        candidateList=candidateName;
    }
    function buyToken() public payable returns(uint){
        // msg.value 就是当前用户的以太 除以单价就是购买的token
        uint tokenToBuy = msg.value/tokenPrice;

        require(tokenToBuy>0,"tokenToBuy must gater than 0");
                require(tokenToBuy<=tokenBalance
        ,"token balance is not enough");
        voterMap[msg.sender].voterAddress =msg.sender;
        voterMap[msg.sender].tokenNumber +=tokenToBuy;
        tokenBalance-=tokenToBuy;
        return tokenToBuy;
    }
    function totalUsedTokens(uint256[] memory votesForCandidate)    internal       pure        returns (uint256)    {
        uint256 totalToken = 0;
        for (uint256 i = 0; i < votesForCandidate.length; i++) {
            totalToken += votesForCandidate[i];
        }
        return totalToken;
    }
//查询被投票人的票数详情
    function tokenForCandidates() public {
        for (uint256 i = 0; i < candidateList.length; i++) {
            emit voterDetail(candidateList[i], receivedNumber[candidateList[i]]);
        }
    }

    function totalVotesFor(bytes2   candidate) public view returns (uint256) {
        return receivedNumber[candidate];
    }

    //已买Token详情
    function totalSold() public view returns (uint256) {
        return tokenTotal - tokenBalance;
    }

    //查询投票人详情
    function voterDetails(address voteradd)
        public
        view
        returns (uint256, uint256[] memory)
    {
        return (
            voterMap[voteradd].tokenNumber,
            voterMap[voteradd].tokenForCandidateList
        );
    }

    //查询所有被投票人
    function allCandidate() public view returns (bytes2[] memory) {
        return candidateList;
    }
    function voteForCandidate(bytes2 candidate,uint voteTokens) public payable {
        require(voteTokens>0,"voteTokens must gater than 0");
        
        int256 idx = idxCandidate(candidate);
        require(idx>=0,"candidate is not exist");

        require(receivedNumber[candidate]>=0,"candidate is not exist");
        require(voterMap[msg.sender].tokenNumber>=voteTokens,"voter tokenNumber is not enough");
        // 第一次初始化
        if(voterMap[msg.sender].tokenForCandidateList.length==0){
            for(uint i=0;i<candidateList.length;i++){
                voterMap[msg.sender].tokenForCandidateList.push(0);
            }
        }
        voterMap[msg.sender].tokenNumber-=voteTokens;
        voterMap[msg.sender].tokenForCandidateList[uint256(idx)]+=voteTokens;
        receivedNumber[candidate] +=voteTokens;
    }

    function idxCandidate(bytes2 candidate) view public returns(int256){
        for(uint256 i=0;i<candidateList.length;i++){
            if(candidateList[i]==candidate)
                return int256(i);
        }
        return int256(-1);
    }

}