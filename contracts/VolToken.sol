// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "./interfaces/IUniswapV2Pair.sol";

contract VolToken is ERC20Upgradeable, OwnableUpgradeable {
  using SafeMathUpgradeable for uint256;

  uint256[30] public price30Days;
  uint256 public lastUpdatedTimestamp;
  uint256 public vol;
  address public uniSwapPairAddress;
  bool public reverse;

  /// @notice Address to Vault Handler
  /// @dev Only vault handlers can mint and burn Vol tokens
  mapping(address => bool) public vaultHandlers;

  /// @notice An event emitted when a vault handler is added
  event VaultHandlerAdded(
    address indexed _owner,
    address indexed _tokenHandler
  );

  /// @notice An event emitted when a vault handler is removed
  event VaultHandlerRemoved(
    address indexed _owner,
    address indexed _tokenHandler
  );

  function initialize(
    string memory _name,
    string memory _symbol,
    uint256[30] memory _price30Days,
    address _uniSwapPairAddress,
    bool _reverse,
    uint256 _vol
  ) public initializer {
    price30Days = _price30Days;
    lastUpdatedTimestamp = block.timestamp;
    uniSwapPairAddress = _uniSwapPairAddress;
    reverse = _reverse;
    vol = _vol;
    ERC20Upgradeable.__ERC20_init(_name, _symbol);
    OwnableUpgradeable.__Ownable_init();
  /// @notice Reverts if called by any account that is not a vault.
  modifier onlyVault() {
    require(vaultHandlers[msg.sender], "caller is not a vault");
    _;
  }

  modifier checkLastUpdated() {
    //uncomment this when deploying to prod
    // require(
    //     block.timestamp - lastUpdatedTimestamp > 86400000,
    //     "vol was updated less than day ago"
    // );
    // _;

    //use this for testing only
    require(
      block.timestamp - lastUpdatedTimestamp >= 0,
      "vol was updated less than a day ago"
    );
    _;
  }

  function updateVol() public checkLastUpdated {
    (uint256 reserve0, uint256 reserve1, ) =
      IUniswapV2Pair(uniSwapPairAddress).getReserves();
    for (uint256 i = 0; i < 30; i++) {
      if (i != 29) {
        price30Days[i] = price30Days[i + 1];
      } else {
        price30Days[29] = reverse ? reserve1 / reserve0 : reserve0 / reserve1;
      }
    }

    uint256 mean = 0;
    uint256 sum = 0;
    uint256 varSum = 0;
    uint256 meanDiff = 0;

    for (uint256 i = 0; i < 30; i++) {
      sum = sum + price30Days[i];
    }
    mean = sum / 30;

    for (uint256 i = 0; i < 30; i++) {
      meanDiff = price30Days[i] - mean;
      varSum = varSum + meanDiff * meanDiff;
    }

    uint256 variance = varSum / 30;
    vol = sqrt(variance);
    lastUpdatedTimestamp = block.timestamp;
  }

  function getVol() public view returns (uint256) {
    return vol;
  }

  function sqrt(uint256 x) private pure returns (uint256 y) {
    uint256 z = (x + 1) / 2;
    y = x;
    while (z < y) {
      y = z;
      z = (x / z + z) / 2;
    }
  }

  /// @notice Adds a new address as a vault
  /// @param _vaultHandler address of a contract with permissions to mint and burn tokens
  function addVaultHandler(address _vaultHandler) external onlyOwner {
    vaultHandlers[_vaultHandler] = true;
    emit VaultHandlerAdded(msg.sender, _vaultHandler);
  }

  /// @notice Removes an address as a vault
  /// @param _vaultHandler address of the contract to be removed as vault
  function removeVaultHandler(address _vaultHandler) external onlyOwner {
    vaultHandlers[_vaultHandler] = false;
    emit VaultHandlerRemoved(msg.sender, _vaultHandler);
  }

  function version() public pure virtual returns (string memory) {
    return "1.0.0";
  }
}
