// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract QueriFi {
    
    struct Question {
        address user;
        uint id;
        uint timeOfCreation;
        bool bountyBased;
        uint mainBounty;
        uint bountyPool;
        address bountyWinner;
        uint timeOfBounty; // Unix timestamp (in seconds)
        bool bountyClaimed;
    }
    
    struct Answer {
        address user;
        uint questionId;
        uint answerId;
        uint like;
        uint dislike;
    }
    
    mapping(address => string) public users;
    mapping(uint => Question) public questions;
    mapping(uint => Answer) public answers;
    mapping(uint => mapping(address => bool)) public likedBy;
    mapping(uint => mapping(address => bool)) public dislikedBy;
    mapping(address => mapping(uint => bool)) public hasInteracted;
    mapping(uint => uint) public answerShare;
    
    uint public questionCounter;
    uint public answerCounter;
    
    error OnlyQuestionOwner();
    error UserAlreadyExists();
    error UserNotFound();
    error NotQuestionOwner();
    error NoBountyToCollect();
    error BountyTimeNotElapsed();
    error BountyNotEnabled();
    error BountyAlreadyDistributed();
    error AnswerNotFound();
    error AlreadyInteracted();
    
    modifier onlyQuestionOwner(uint _questionId) {
        if (msg.sender != questions[_questionId].user)
            revert OnlyQuestionOwner();
        _;
    }
    
    function createUser(string memory _name) external {
        if (bytes(users[msg.sender]).length > 0)
            revert UserAlreadyExists();
        users[msg.sender] = _name;
    }
    
    function getUser(address _userAddress) external view returns (string memory) {
        string memory name = users[_userAddress];
        if (bytes(name).length == 0)
            revert UserNotFound();
        return name;
    }
    
    function setUser(string memory _name) external {
        if (bytes(users[msg.sender]).length == 0)
            revert UserNotFound();
        users[msg.sender] = _name;
    }

  function createQuestion(
    uint _questionId,
    bool _bountyBased,
    uint _mainBounty, // Main bounty amount in wei
    uint _bountyPool, // Bounty pool amount in wei
    uint _timeOfBounty // Unix timestamp (in seconds)
) external payable {
    require(_mainBounty > 0, "Main bounty must be greater than zero");
    require(_bountyPool > 0, "Bounty pool must be greater than zero");
    require(msg.value >= _mainBounty + _bountyPool, "Insufficient funds sent");
    
    // Transfer the main bounty and bounty pool to the contract
    uint totalAmount = _mainBounty + _bountyPool;
    (bool success, ) = address(this).call{value: totalAmount}("");
    require(success, "Failed to transfer bounty to contract");
    
    questionCounter = _questionId;
    questions[_questionId] = Question(
        msg.sender,
        _questionId,
        block.timestamp,
        _bountyBased,
        _mainBounty,
        _bountyPool,
        address(0),
        _timeOfBounty,
        false
    );
}



    function createAnswer(uint _answerId, uint _questionId) external {
        answerCounter = _answerId;
        answers[_answerId] = Answer(msg.sender, _questionId, _answerId, 0, 0);
    }
    
    function likeAnswer(uint _answerId) external {
        uint _questionId = answers[_answerId].questionId;
        if (_answerId == 0 || _questionId == 0 || _answerId > answerCounter || _questionId > questionCounter)
            revert AnswerNotFound();
        if (hasInteracted[msg.sender][_answerId])
            revert AlreadyInteracted();
        
        answers[_answerId].like++;
        likedBy[_answerId][msg.sender] = true;
        hasInteracted[msg.sender][_answerId] = true;
    }
    
    function dislikeAnswer(uint _answerId) external {
        uint _questionId = answers[_answerId].questionId;
        if (_answerId == 0 || _questionId == 0 || _answerId > answerCounter || _questionId > questionCounter)
            revert AnswerNotFound();
        if (hasInteracted[msg.sender][_answerId])
            revert AlreadyInteracted();
        
        answers[_answerId].dislike++;
        dislikedBy[_answerId][msg.sender] = true;
        hasInteracted[msg.sender][_answerId] = true;
    }
    
    function collectBounty(uint _questionId) external {
        require(_questionId > 0 && _questionId <= questionCounter, "Invalid question ID");
        Question storage question = questions[_questionId];
        require(question.bountyBased, "Bounty is not enabled for this question");
        require(question.bountyPool > 0, "No bounty available to collect");
        require(block.timestamp >= question.timeOfBounty, "Bounty time not elapsed");
        require(!question.bountyClaimed, "Bounty already claimed");

        question.bountyClaimed = true;
        distributeBountyPool(_questionId);
    }

    function distributeBountyPool(uint _questionId) internal {
        Question storage question = questions[_questionId];
        uint totalLikes;
        uint totalDislikes;
        
        // Calculate total likes and dislikes for the question
        for (uint i = 1; i <= answerCounter; i++) {
            if (answers[i].questionId == _questionId) {
                totalLikes += answers[i].like;
                totalDislikes += answers[i].dislike;
            }
        }
        
        // Calculate each answer's share of the bounty pool based on likes and dislikes
        for (uint j = 1; j <= answerCounter; j++) {
            if (answers[j].questionId == _questionId) {
                uint answerScore = answers[j].like - answers[j].dislike;
                if (totalLikes + totalDislikes == 0) {
                    answerShare[j] = 0;
                } else {
                    answerShare[j] = (answerScore * question.bountyPool) / (totalLikes + totalDislikes);
                }
            }
        }
        
        // Transfer each answer's share of the bounty pool
        for (uint k = 1; k <= answerCounter; k++) {
            if (answers[k].questionId == _questionId && answerShare[k] > 0) {
                payable(answers[k].user).transfer(answerShare[k]);
            }
        }
    }

    function distributeMainBounty(uint _questionId, uint _answerId) external onlyQuestionOwner(_questionId) {
        require(_questionId > 0 && _questionId <= questionCounter, "Invalid question ID");
        Question storage question = questions[_questionId];
        require(question.bountyBased, "Bounty is not enabled for this question");
        require(question.mainBounty > 0, "Main bounty is not set");
        require(question.bountyWinner == address(0), "Bounty has already been distributed for this question");
        require(_answerId > 0 && _answerId <= answerCounter, "Invalid answer ID");
        require(answers[_answerId].questionId == _questionId, "Answer does not belong to this question");

        question.bountyWinner = answers[_answerId].user;
        payable(question.bountyWinner).transfer(question.mainBounty);
        question.mainBounty = 0;
    }

    function refundMainBounty(uint _questionId) external onlyQuestionOwner(_questionId) {
        require(_questionId > 0 && _questionId <= questionCounter, "Invalid question ID");
        Question storage question = questions[_questionId];
        require(question.bountyBased, "Bounty is not enabled for this question");
        require(question.mainBounty > 0, "Main bounty is not set");
        require(question.bountyWinner == address(0), "Bounty has already been distributed for this question");

        payable(question.user).transfer(question.mainBounty);
        question.mainBounty = 0;
    }

    function getDistributedBounty(uint _questionId) external view returns (uint[] memory) {
    require(_questionId > 0 && _questionId <= questionCounter, "Invalid question ID");

    uint[] memory distributedBounties = new uint[](answerCounter);

    if (questions[_questionId].bountyBased) {
        uint totalLikes;
        uint totalDislikes;
        // Calculate total likes and dislikes for the question
        for (uint i = 1; i <= answerCounter; i++) {
            if (answers[i].questionId == _questionId) {
                totalLikes += answers[i].like;
                totalDislikes += answers[i].dislike;
            }
        }
        // Calculate each answer's share of the bounty pool based on likes and dislikes
        for (uint j = 1; j <= answerCounter; j++) {
            if (answers[j].questionId == _questionId) {
                uint answerScore = answers[j].like - answers[j].dislike;
                if (totalLikes + totalDislikes == 0) {
                    distributedBounties[j - 1] = 0;
                } else {
                    distributedBounties[j - 1] = (answerScore * questions[_questionId].bountyPool) / (totalLikes + totalDislikes);
                }
            }
        }
    }
    return distributedBounties;
    }

}