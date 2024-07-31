import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "@styles/Home.module.css";
import QuestCategory from "@components/quests/questCategory";
import QuestsSkeleton from "@components/skeletons/questsSkeleton";
import { getBoosts } from "@services/apiService";
import Link from "next/link";
import { QuestsContext } from "@context/QuestsProvider";
import CheckIcon from "@components/UI/iconsComponents/icons/checkIcon";
import Typography from "@components/UI/typography/typography";
import { TEXT_TYPE } from "@constants/typography";

type QuestCategoriesProps = {
  categories: QuestCategory[];
};

const QuestCategories: FunctionComponent<QuestCategoriesProps> = ({
  categories,
}) => {
  const [boosts, setBoosts] = useState<Boost[]>([]);
  const { completedBoostIds } = useContext(QuestsContext);

  const fetchBoosts = async () => {
    try {
      const res = await getBoosts();
      if (res) setBoosts(res);
    } catch (err) {
      console.log("Error while fetching boosts", err);
    }
  };

  useEffect(() => {
    fetchBoosts();
  }, []);

  const completedBoostNumber = useMemo(
    () => boosts?.filter((b) => completedBoostIds?.includes(b.id)).length,
    [boosts, completedBoostIds]
  );

  return (
    <section className={styles.section}>
      <Typography
        type={TEXT_TYPE.H1}
        color="transparent"
        className={styles.title}
      >
        Accomplish your Starknet Quests
      </Typography>

      <div className={`${styles.container} my-12`}>
        <div className={styles.questCategories}>
          {boosts.length !== 0 ? (
            <div className={styles.questCategoryContainer}>
              <Link href={`/quest-boost`} className={styles.questCategory}>
                <div className={styles.categoryInfos}>
                  <Typography
                    type={TEXT_TYPE.H2}
                    className={`text-gray-200 ${styles.categoryInfosH2}`}
                  >
                    Boosts Quest
                  </Typography>
                  <Typography
                    type={TEXT_TYPE.BODY_DEFAULT}
                    className={`text-gray-200 normal-case ${styles.categoryInfosText}`}
                  >
                    {completedBoostNumber === boosts.length ? (
                      <span className="flex">
                        <span className="mr-2">All boosts done</span>
                        <CheckIcon width="24" color="#6AFFAF" />
                      </span>
                    ) : (
                      `${completedBoostNumber}/${boosts.length} Boost${
                        boosts.length > 1 ? "s" : ""
                      } done`
                    )}
                  </Typography>
                </div>
                <img src="/visuals/boost/logo.webp" />
              </Link>
            </div>
          ) : null}
          {categories ? (
            categories.map((category) => {
              return <QuestCategory key={category.name} category={category} />;
            })
          ) : (
            <QuestsSkeleton />
          )}
        </div>
      </div>
    </section>
  );
};

export default QuestCategories;
