import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styles from "@styles/questboost.module.css";
import questStyles from "@styles/quests.module.css";
import Cardstyles from "@styles/components/card.module.css";
import Link from "next/link";
import UnavailableIcon from "@components/UI/iconsComponents/icons/unavailableIcon";
import CheckIcon from "@components/UI/iconsComponents/icons/checkIcon";
import TrophyIcon from "@components/UI/iconsComponents/icons/trophyIcon";
import TokenSymbol from "./TokenSymbol";
import useBoost from "@hooks/useBoost";
import theme from "@styles/theme";
import { useAccount } from "@starknet-react/core";
import { CompletedQuests, QueryError } from "types/backTypes";
import Typography from "@components/UI/typography/typography";
import { TEXT_TYPE } from "@constants/typography";

type BoostCardProps = {
  boost: Boost;
  completedQuests?: CompletedQuests | QueryError;
};

const BoostCard: FunctionComponent<BoostCardProps> = ({
  boost,
  completedQuests,
}) => {
  const { address } = useAccount();
  const [userBoostCheckStatus, setUserBoostCheckStatus] =
    useState<boolean>(false);
  const [hasUserCompletedBoost, setHasUserCompletedBoost] =
    useState<boolean>(false);
  const { getBoostClaimStatus } = useBoost();
  const [hovered, setHovered] = useState<boolean>(false);

  useEffect(() => {
    if (!boost || !completedQuests) return;
    let userBoostCompletionCheck = true;
    boost.quests.forEach((quest) => {
      // no quests are completed by user
      if (!completedQuests) return false;
      // check if all quests are completed by the user and if not then set this flag value to false
      if (!(completedQuests as CompletedQuests)?.includes(quest))
        userBoostCompletionCheck = false;
    });
    setHasUserCompletedBoost(userBoostCompletionCheck);
  }, [completedQuests, boost]);

  useEffect(() => {
    if (!address) return;
    const res = getBoostClaimStatus(address, boost?.id);
    setUserBoostCheckStatus(res);
  }, [address]);

  const isClickable = useMemo(() => {
    if (
      boost.expiry < Date.now() &&
      hasUserCompletedBoost &&
      userBoostCheckStatus
    ) {
      return false;
    } else if (boost.expiry < Date.now() && !hasUserCompletedBoost) {
      return false;
    }
    return true;
  }, [userBoostCheckStatus, hasUserCompletedBoost]);

  return (
    <Link
      className="flex"
      href={isClickable ? `/quest-boost/${boost?.id}` : ""}
    >
      <div
        className={styles.boost_card_container}
        style={{
          borderColor:
            hovered && isClickable
              ? theme.palette.secondary.dark
              : "transparent",
          cursor: isClickable ? "inherit" : "not-allowed",
        }}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          className={Cardstyles.cardImage}
          src={boost?.img_url}
          alt="boost"
        />
        <div className={styles.boost_card_content}>
          <Typography
            type={TEXT_TYPE.BODY_DEFAULT}
            color="secondary"
            className={styles.card_title}
          >
            {boost?.name}
          </Typography>
          <Typography type={TEXT_TYPE.BODY_DEFAULT}>
            {boost?.quests.length} quest{boost.quests.length > 1 ? "s" : ""}
          </Typography>
          {!hasUserCompletedBoost && boost.expiry > Date.now() ? (
            <>
              <div className={questStyles.issuer}>
                <Typography
                  type={TEXT_TYPE.BODY_DEFAULT}
                  className={styles.issuerText}
                >
                  {boost?.amount}
                </Typography>
                <TokenSymbol tokenAddress={boost.token} />
              </div>
            </>
          ) : (
            <div className="flex w-full">
              <div className="flex items-center">
                {address && (
                  <div className={styles.issuer}>
                    {boost.expiry < Date.now() ? (
                      hasUserCompletedBoost ? (
                        !userBoostCheckStatus ? (
                          boost.winner != null ? (
                            <>
                              <Typography
                                type={TEXT_TYPE.BODY_DEFAULT}
                                color="white"
                              >
                                See my reward
                              </Typography>
                              <TrophyIcon width="24" color="#8BEED9" />
                            </>
                          ) : (
                            <>
                              <UnavailableIcon width="24" color="#D32F2F" />
                              <Typography
                                type={TEXT_TYPE.BODY_DEFAULT}
                                color="white"
                                className="mr-2"
                              >
                                Boost ended
                              </Typography>
                            </>
                          )
                        ) : (
                          userBoostCheckStatus && (
                            <>
                              <UnavailableIcon width="24" color="#D32F2F" />
                              <Typography
                                type={TEXT_TYPE.BODY_DEFAULT}
                                color="white"
                                className="mr-2"
                              >
                                Boost ended
                              </Typography>
                            </>
                          )
                        )
                      ) : (
                        <>
                          <UnavailableIcon width="24" color="#D32F2F" />
                          <Typography
                            type={TEXT_TYPE.BODY_DEFAULT}
                            color="white"
                            className="mr-2"
                          >
                            Boost ended
                          </Typography>
                        </>
                      )
                    ) : (
                      hasUserCompletedBoost && (
                        <>
                          <Typography
                            type={TEXT_TYPE.BODY_DEFAULT}
                            color="white"
                          >
                            Done
                          </Typography>
                          <CheckIcon width="24" color="#6AFFAF" />
                        </>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BoostCard;
